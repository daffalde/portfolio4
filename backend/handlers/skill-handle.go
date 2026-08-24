package handlers

import (
	"backend/models"
	"backend/repository"
	"backend/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func GetAllSkillHandle(c *gin.Context) {
	data, err := repository.GetAllSkill()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, data)
}

func InsertSkillHandle(c *gin.Context) {
	var m models.Skill
	getName := c.PostForm("nameSkill")
	getCat := c.PostForm("category")
	getId := uuid.New()

	file, err := c.FormFile("file")

	src, err := file.Open()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "step 1"})
		return
	}

	getUrl, err := services.UploadFile(src, getId.String(), file.Header.Get("Content-Type"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "step 2"})
		return
	}

	m.NameSkill = getName
	m.Category = getCat
	m.IdSkill = getId
	m.ImageSkill = getUrl

	err = repository.InsertSkill(&m)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "step 3"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Data ditambahkan"})
}
