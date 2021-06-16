
const { Router } = require("express")
const { project } = require("../controllers")
const { middleWare } = require("../middleware")

const router = Router()

router.get("/projects", project.getProjects)
router.get("/projects/:projectId", project.getProjectById)
router.post("/users/:id/projects", middleWare, project.createProject)
router.put("/users/:id/projects/:projectId", middleWare, project.updateProjectById)
router.delete("/users/:id/projects/:projectId", middleWare, project.removeProjectById)

module.exports = router;