package repository

import (
	"backend/config"
	"backend/models"
)

func RegisterUser(m *models.User) error {
	result := config.DB.Create(m)
	return result.Error
}

func GetUserByEmail(email string) (models.User, error) {
	var user models.User
	result := config.DB.Where("email = ?", email).First(&user)
	return user, result.Error
}
