package routes

import (
	"backend/handlers"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func IntegratedRoute() *gin.Engine {
	r := gin.Default()
	r.Use(cors.Default())

	r.GET("/project", handlers.GetAllProjectHandle)
	r.GET("/project/select", handlers.GetByIdProjectHandle)
	r.POST("/project/input", handlers.InsertProjectHandle)
	r.DELETE("/project/delete", handlers.DeleteProjectHandle)

	r.GET("/skill", handlers.GetAllSkillHandle)
	r.POST("/skill/input", handlers.InsertSkillHandle)
	r.DELETE("/skill/delete", handlers.DeleteSkillHandle)

	r.GET("/message", handlers.GetAllMessageHandle)
	r.GET("/message/select", handlers.GetByIdMessageHandle)
	r.POST("/message/input", handlers.InsertMessageHandle)
	r.DELETE("/message/delete", handlers.DeleteMessageHandle)

	return r
}
