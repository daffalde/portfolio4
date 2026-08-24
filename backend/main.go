package main

import (
	"backend/config"
	"backend/routes"
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	config.ConnectDB()
	routes.IntegratedRoute()
	godotenv.Load()
	fmt.Println("Server running....")
	r := routes.IntegratedRoute()
	r.Run(os.Getenv("PORT"))
}
