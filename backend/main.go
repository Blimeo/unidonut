package main

import (
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func handleSignup(c *gin.Context) {
	var u UserAuth
	if err := c.ShouldBindJSON(&u); err != nil {
		log.Print(err)
		c.JSON(http.StatusBadRequest, gin.H{"msg": err})
		return
	}
	log.Println(u)
	authToken, err := createUser(&u)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err})
		return
	}
	c.JSON(http.StatusOK, gin.H{"authToken": &authToken})
}

func handleLogin(c *gin.Context) {
	var u UserAuth
	if err := c.ShouldBindJSON(&u); err != nil {
		log.Print(err)
		c.JSON(http.StatusBadRequest, gin.H{"msg": err})
		return
	}
	authToken, err := login(&u)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"msg": err})
		return
	}
	c.JSON(http.StatusOK, gin.H{"authToken": &authToken})

}

func main() {
	r := gin.Default()
	r.Use(cors.Default())
	r.POST("/register", handleSignup)
	r.POST("/login", handleLogin)

	r.Run(":5000")
}
