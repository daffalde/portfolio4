package repository

import (
	"backend/config"
	"backend/models"
)

func GetAllMessage() ([]models.Message, error) {
	var m []models.Message
	result := config.DB.Find(&m)
	return m, result.Error
}

func GetByIdMessage(id models.Message) (models.Message, error) {
	var m models.Message
	result := config.DB.First(&m, id)
	return m, result.Error
}

func InsertMessage(m *models.Message) error {
	err := config.DB.Create(m)
	return err.Error
}

func DeleteMessage(id models.Message) error {
	err := config.DB.Delete(&id)
	return err.Error
}
