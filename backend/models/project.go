package models

import (
	"time"

	"github.com/google/uuid"
)

type Project struct {
	IdProject    uuid.UUID `gorm:"primaryKey;column:id_project"`
	ImageProject string
	NameProject  string
	Type         string
	Description  string
	Link         string
	CreatedAt    time.Time
}

func (Project) TableName() string {
	return "project"
}
