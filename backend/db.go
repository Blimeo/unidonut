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
	connectionStringTemplate = "mongodb+srv://%s:%s@%s"
)

// GetConnection Retrieves a client to the MongoDB
func getConnection() (*mongo.Client, context.Context, context.CancelFunc) {
	username := os.Getenv("MONGODB_USERNAME")
	Password := os.Getenv("MONGODB_PASSWORD")
	clusterEndpoint := os.Getenv("MONGODB_ENDPOINT")

	connectionURI := fmt.Sprintf(connectionStringTemplate, username, Password, clusterEndpoint)

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

func createUser(u *Register) (*string, error) {
	if u.Email == "" || u.Password == "" || u.FirstName == "" || u.LastName == "" {
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

func login(u *Login) (*User, error) {
	if u.Email == "" || u.Password == "" {
		return nil, errors.New("Blank input")
	}
	client, ctx, cancel := getConnection()
	defer cancel()
	defer client.Disconnect(ctx)
	user_collection := client.Database("unidonut").Collection("users")
	var result *User
	err := user_collection.FindOne(ctx, bson.D{{"email", u.Email}, {"password", u.Password}}).Decode(&result)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, errors.New("No such user exists")
		}
	}
	return result, nil
}

func getUsers() ([]string, error) {
	client, ctx, cancel := getConnection()
	defer cancel()
	defer client.Disconnect(ctx)
	user_collection := client.Database("unidonut").Collection("users")
	var result []string
	cursor, err := user_collection.Find(ctx, bson.D{{}})
	if err != nil {
		return nil, errors.New("Find operation failed")
	}
	for cursor.Next(ctx) {
		var elem bson.M
		err := cursor.Decode(&elem)
		if err != nil {
			return nil, errors.New("Failed to decode element into bson.M")
		}
		bruh := elem["email"].(string)
		result = append(result, bruh)
	}
	cursor.Close(ctx)
	return result, nil
}

func getPartner(x string) (*Pairing, error) {
	client, ctx, cancel := getConnection()
	defer cancel()
	defer client.Disconnect(ctx)
	pairing_collection := client.Database("unidonut").Collection("pairings")
	var partner Pairing
	err := pairing_collection.FindOne(ctx, bson.D{{"first", x}}).Decode(&partner)
	if err != nil {
		return nil, errors.New("tjheoithaj")
	}
	return &partner, nil
}

func getPairings() ([]Pairing, error) {
	client, ctx, cancel := getConnection()
	defer cancel()
	defer client.Disconnect(ctx)
	pairing_collection := client.Database("unidonut").Collection("pairings")
	var result []Pairing
	cursor, err := pairing_collection.Find(ctx, bson.D{{}})
	if err != nil {
		panic(err)
	}
	if err = cursor.All(ctx, &result); err != nil {
		return nil, errors.New("wutface")
	}
	return result, nil
}

func updatePairings(pairs []Pairing) error {
	client, ctx, cancel := getConnection()
	defer cancel()
	defer client.Disconnect(ctx)
	pairing_collection := client.Database("unidonut").Collection("pairings")
	pairing_collection.DeleteMany(ctx, bson.D{})
	v := make([]interface{}, len(pairs))
	for i := range pairs {
		v[i] = pairs[i]
	}
	// opts := options.Update()
	// opts.SetUpsert(true)
	_, err := pairing_collection.InsertMany(ctx, v)
	if err != nil {
		return errors.New("Insertion failed")
	}
	return nil
}
