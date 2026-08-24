package models

import (
	"time"

	"github.com/google/uuid"
)

type Message struct {
	IdMessage   uuid.UUID `gorm:"primaryKey;column:id_message"`
	NameMessage string    `gorm:"column:name_message" json:"name_message"`
	Subject     string
	Message     string
	CreatedAt   time.Time
}

func (Message) TableName() string {
	return "message"
}
