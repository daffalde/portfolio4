package handlers

import (
	"backend/models"
	"backend/repository"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func GetAllMessageHandle(c *gin.Context) {
	data, err := repository.GetAllMessage()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, data)
}

func GetByIdMessageHandle(c *gin.Context) {
	getId := c.Query("id")

	id, err := uuid.Parse(getId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	data, err := repository.GetByIdMessage(models.Message{IdMessage: id})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, data)
}

func InsertMessageHandle(c *gin.Context) {
	var m models.Message

	getId := uuid.New()

	if err := c.ShouldBindJSON(&m); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	m.IdMessage = getId

	if err := repository.InsertMessage(&m); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Data ditambahkan"})
}

func DeleteMessageHandle(c *gin.Context) {
	getId := c.Query("id")

	id, err := uuid.Parse(getId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := repository.DeleteMessage(models.Message{IdMessage: id}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Diata dihapus"})
}
