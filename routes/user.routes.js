
const { Router } = require("express")
const { user } = require("../controllers")
const { middleWare } = require("../middleware")

const router = Router();

router.get("/users", user.getUsers)
router.get("/users/:id", user.getUserById)
router.post("/users", user.createUser)
router.put("/users/:id", middleWare, user.updateUserById)
router.delete("/users/:id", middleWare, user.removeUserById)
router.post("/users/:id", middleWare, user.removeUserById)

module.exports = router;