package config

import (
	"context"
	"log"
	"os"

	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

var AWS *s3.Client

func ConnectAWS() {
	cfg, err := config.LoadDefaultConfig(
		context.TODO(),
		config.WithRegion(os.Getenv("REGION")),
		config.WithCredentialsProvider(
			credentials.NewStaticCredentialsProvider(
				os.Getenv("ACCESS"),
				os.Getenv("SECRET"),
				"",
			),
		),
	)

	if err != nil {
		log.Fatal("Koneksi aws gagal")
	}

	AWS = s3.NewFromConfig(cfg)
}
