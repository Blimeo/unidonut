package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func handleSignup(c *gin.Context) {
	var u User
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

func handleLogin(c *gin.Context) {
	var u UserLogin
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
	r.POST("/signup/", handleSignup)
	r.POST("/login/", handleLogin)
	r.Run(":8000")
}
