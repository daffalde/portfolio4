package repository

import (
	"backend/config"
	"backend/models"
)

func GetAllProject() ([]models.Project, error) {
	var m []models.Project
	result := config.DB.Find(&m)
	return m, result.Error
}
