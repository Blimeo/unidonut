package main

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"time"

	jwt "github.com/appleboy/gin-jwt/v2"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func handleSignup(c *gin.Context) {
	var u Register
	if err := c.ShouldBindJSON(&u); err != nil {
		log.Print(err)
		c.JSON(http.StatusBadRequest, gin.H{"msg": err})
		return
	}
	authToken, err := createUser(&u)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err})
		return
	}
	c.JSON(http.StatusOK, gin.H{"authToken": &authToken})
}

func handleLogin(c *gin.Context) (interface{}, error) {
	var loginVals Login
	if err := c.ShouldBind(&loginVals); err != nil {
		return "", jwt.ErrMissingLoginValues
	}

	user, err := login(&loginVals)
	if err != nil {
		return nil, jwt.ErrFailedAuthentication
	}
	return &User{
		Email:     user.Email,
		FirstName: user.FirstName,
		LastName:  user.LastName,
	}, nil
}

func verify_token(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	user, _ := c.Get(identityKey)
	c.JSON(200, gin.H{
		"userID": claims[identityKey],
		"email":  user.(*User).Email,
		"text":   "Hello World.",
	})
}

func verify_admin(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	userID := claims[identityKey]
	if userID == "my1@berkeley.edu" {
		c.Status(http.StatusOK)
	} else {
		c.AbortWithStatus(http.StatusForbidden)
	}
}

func generate_pairings(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	userID := claims[identityKey]
	if userID == "my1@berkeley.edu" {
		users, err := getUsers()
		// log.Println(users)
		if err != nil {
			c.AbortWithStatus(http.StatusInternalServerError)
		}

		pairings := make([]Pairing, 0)
		// shuffle users
		rand.Seed(time.Now().UnixNano())
		rand.Shuffle(len(users), func(i, j int) { users[i], users[j] = users[j], users[i] })
		// remove admin account from shuffle
		for i, other := range users {
			if other == "my1@berkeley.edu" {
				users = append(users[:i], users[i+1:]...)
				break
			}
		}
		//add "nobody" account if we have odd # of users
		if len(users)%2 == 1 {
			users = append(users, "Nobody")
		}
		// put pairings into map
		for i := 0; i < len(users); i += 2 {
			pairings = append(pairings, Pairing{users[i], users[i+1]})
		}
		jsonString, _ := json.Marshal(pairings)
		log.Println(string(jsonString))
		c.JSON(http.StatusOK, pairings)
	} else {
		c.AbortWithStatus(http.StatusForbidden)
	}
}

func getUserInfo(c *gin.Context) {
	claims := jwt.ExtractClaims(c)
	log.Println(claims)

}

var identityKey = "id"

func main() {
	r := gin.Default()
	r.Use(cors.Default())
	r.POST("/register", handleSignup)
	authMiddleware, err := jwt.New(&jwt.GinJWTMiddleware{
		Realm:       "Unidonut",
		Key:         []byte("secret key"),
		Timeout:     time.Hour,
		MaxRefresh:  time.Hour,
		IdentityKey: identityKey,
		PayloadFunc: func(data interface{}) jwt.MapClaims {
			if v, ok := data.(*User); ok {
				return jwt.MapClaims{
					identityKey: v.Email,
				}
			}
			return jwt.MapClaims{}
		},
		IdentityHandler: func(c *gin.Context) interface{} {
			claims := jwt.ExtractClaims(c)
			return &User{
				Email: claims[identityKey].(string),
			}
		},
		Authenticator: handleLogin,
		Authorizator: func(data interface{}, c *gin.Context) bool {
			if _, ok := data.(*User); ok {
				return true
			}

			return false
		},
		Unauthorized: func(c *gin.Context, code int, message string) {
			c.JSON(code, gin.H{
				"code":    code,
				"message": message,
			})
		},

		TokenLookup:   "header: Authorization, query: token, cookie: jwt",
		TokenHeadName: "Bearer",
		TimeFunc:      time.Now,
	})

	if err != nil {
		log.Fatal("JWT Error:" + err.Error())
	}

	errInit := authMiddleware.MiddlewareInit()

	if errInit != nil {
		log.Fatal("authMiddleware.MiddlewareInit() Error:" + errInit.Error())
	}

	r.POST("/login", authMiddleware.LoginHandler)

	r.NoRoute(authMiddleware.MiddlewareFunc(), func(c *gin.Context) {
		claims := jwt.ExtractClaims(c)
		log.Printf("NoRoute claims: %#v\n", claims)
		c.JSON(404, gin.H{"code": "PAGE_NOT_FOUND", "message": "Page not found"})
	})

	auth := r.Group("/auth")

	auth.GET("/refresh_token", authMiddleware.RefreshHandler)
	auth.Use(authMiddleware.MiddlewareFunc())
	{
		auth.GET("/verify_access_token", verify_token)
		auth.GET("/verify_admin", verify_admin)
		auth.GET("/generate_pairings", generate_pairings)
		auth.GET("/get_user_info", getUserInfo)
	}
	r.Run(":5000")
}
