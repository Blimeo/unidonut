package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/bson"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	// Timeout operations after N seconds
	connectTimeout           = 5
	connectionStringTemplate = "mongodb://%s:%s@%s"
)

// GetConnection Retrieves a client to the MongoDB
func getConnection() (*mongo.Client, context.Context, context.CancelFunc) {
	username := os.Getenv("MONGODB_USERNAME")
	password := os.Getenv("MONGODB_PASSWORD")
	clusterEndpoint := os.Getenv("MONGODB_ENDPOINT")

	connectionURI := fmt.Sprintf(connectionStringTemplate, username, password, clusterEndpoint)

	client, err := mongo.NewClient(options.Client().ApplyURI(connectionURI))
	if err != nil {
		log.Printf("Failed to create client: %v", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), connectTimeout*time.Second)

	err = client.Connect(ctx)
	if err != nil {
		log.Printf("Failed to connect to cluster: %v", err)
	}

	// Force a connection to verify our connection string
	err = client.Ping(ctx, nil)
	if err != nil {
		log.Printf("Failed to ping cluster: %v", err)
	}

	fmt.Println("Connected to MongoDB!")
	return client, ctx, cancel
}

func createUser(u *User) (*string, error) {
	if u.email == "" || u.pwd == "" || u.username == "" {
		return nil, errors.New("Blank input")
	}
	client, ctx, cancel := getConnection()
	defer cancel()
	defer client.Disconnect(ctx)
	user_collection := client.Database("unidonut").Collection("users")
	result, err := user_collection.InsertOne(ctx, u)
	if err != nil {
		log.Printf("Failed to sign up user: %v", err)
		return nil, err
	}
	log.Printf("user id: %s", result)
	token := "Sample"
	return &token, nil
}

func login(u *UserLogin) (*string, error) {
	if u.email == "" || u.pwd == "" {
		return nil, errors.New("Blank input")
	}
	client, ctx, cancel := getConnection()
	defer cancel()
	defer client.Disconnect(ctx)
	user_collection := client.Database("unidonut").Collection("users")
	var result bson.M
	err := user_collection.FindOne(ctx, bson.D{{"email", u.email}, {"pwd", u.pwd}}).Decode(&result)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, errors.New("No such user exists")
		}
	}
	token := "Valid user"
	return &token, nil
}
