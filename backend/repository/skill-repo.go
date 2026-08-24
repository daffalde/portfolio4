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
