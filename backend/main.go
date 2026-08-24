package main

import (
	"backend/routes"
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()
	fmt.Println("Server running....")
	r := routes.IntegratedRoute()
	r.Run(os.Getenv("PORT"))
}
