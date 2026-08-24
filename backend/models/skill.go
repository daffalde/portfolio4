package models

import "github.com/google/uuid"

type Skill struct {
	IdSkill    uuid.UUID `gorm:"primaryKey;column:id_skill"`
	ImageSkill string
	NameSkill  string
	Category   string
}

func (Skill) TableName() string {
	return "skill"
}
