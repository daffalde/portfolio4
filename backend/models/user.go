package models

import "github.com/google/uuid"

type User struct {
	IdUser   uuid.UUID `gorm:"primaryKey;column:id_user"`
	Email    string
	NameUser string
	Image    string
	Password string
}

func (User) TableName() string {
	return "users"
}
