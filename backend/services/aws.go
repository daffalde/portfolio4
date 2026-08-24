package services

import (
	"backend/config"
	"context"
	"fmt"
	"io"
	"os"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

func UploadFile(file io.Reader, fileName, contentType string) (string, error) {
	if _, err := config.AWS.PutObject(
		context.Background(),
		&s3.PutObjectInput{
			Bucket:      aws.String(os.Getenv("BUCKET")),
			Key:         aws.String(fileName),
			Body:        file,
			ContentType: aws.String(contentType),
		},
	); err != nil {
		return "", err
	}

	return fmt.Sprintf("https://%s.s3.%s.amazonaws.com/%s", os.Getenv("BUCKET"), os.Getenv("REGION"), fileName), nil

}
