
const { Router } = require("express")
const { user } = require("../controllers")

const router = Router();

router.get("/users", user.getUsers)
router.get("/users/:id", user.getUserById)
router.post("/users", user.createUser)
router.put("/users/:id", user.updateUserById)
router.delete("/users/:id", user.removeUserById)

router.post("/users/:id/projects", user.createProject)

module.exports = router;