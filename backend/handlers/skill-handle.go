package handlers

import (
	"backend/repository"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetAllSkillHandle(c *gin.Context) {
	data, err := repository.GetAllSkill()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, data)
}
