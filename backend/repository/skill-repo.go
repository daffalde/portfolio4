package repository

import (
	"backend/config"
	"backend/models"
)

func GetAllSkill() ([]models.Skill, error) {
	var m []models.Skill
	result := config.DB.Find(&m)
	return m, result.Error
}

func InsertSkill(m *models.Skill) error {
	err := config.DB.Create(m)
	return err.Error
}

func DeleteSkill(id models.Skill) error {
	err := config.DB.Delete(id)
	return err.Error
}
