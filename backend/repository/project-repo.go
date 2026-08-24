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

func GetByIdProject(id models.Project) (models.Project, error) {
	var m models.Project
	result := config.DB.First(&m, id)
	return m, result.Error
}

func InsertProject(m *models.Project) error {
	err := config.DB.Create(m)
	return err.Error
}

func DeleteProject(id models.Project) error {
	err := config.DB.Delete(&id)
	return err.Error
}
