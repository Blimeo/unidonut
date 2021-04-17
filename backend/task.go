package main

// Task - Model of a basic task

type Login struct {
	Email    string `json:"username"`
	Password string `json:"password"`
}

type Register struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

type User struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
}

type Pairing struct {
	First  string `json:"first"`
	Second string `json:"second"`
}
