package handlers

import (
	"backend/models"
	"backend/repository"
	"backend/services"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func GetAllProjectHandle(c *gin.Context) {
	data, err := repository.GetAllProject()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, data)
}

func GetByIdProjectHandle(c *gin.Context) {
	getId := c.Query("id")

	id, err := uuid.Parse(getId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	data, err := repository.GetByIdProject(models.Project{IdProject: id})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, data)
}

func InsertProjectHandle(c *gin.Context) {
	var m models.Project
	getId := uuid.New()
	getName := c.PostForm("name_project")
	getType := c.PostForm("type")
	getDesc := c.PostForm("description")
	getLink := c.PostForm("link")

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

	m.NameProject = getName
	m.Type = getType
	m.Description = getDesc
	m.Link = getLink
	m.ImageProject = getUrl
	m.IdProject = getId

	err = repository.InsertProject(&m)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Data ditambahkan"})
}

func DeleteProjectHandle(c *gin.Context) {
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
	repository.DeleteProject(models.Project{IdProject: id})

	c.JSON(http.StatusOK, gin.H{"message": "Data dihapus"})

}
