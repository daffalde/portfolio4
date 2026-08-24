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
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	getUrl, err := services.UploadFile(src, getId.String(), file.Header.Get("Content-Type"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	m.NameSkill = getName
	m.Category = getCat
	m.IdSkill = getId
	m.ImageSkill = getUrl

	err = repository.InsertSkill(&m)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Data ditambahkan"})
}

func DeleteSkillHandle(c *gin.Context) {
	getId := c.Query("id")

	id, err := uuid.Parse(getId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = services.DeleteFile(getId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	repository.DeleteSkill(models.Skill{IdSkill: id})

	c.JSON(http.StatusOK, gin.H{"message": "Data dihapus"})

}
