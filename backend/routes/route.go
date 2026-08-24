package routes

import (
	"backend/handlers"

	"github.com/gin-gonic/gin"
)

func IntegratedRoute() *gin.Engine {
	r := gin.Default()

	r.GET("/project", handlers.GetAllProjectHandle)

	r.GET("/skill", handlers.GetAllSkillHandle)
	r.POST("/skill/input", handlers.InsertSkillHandle)

	return r
}
