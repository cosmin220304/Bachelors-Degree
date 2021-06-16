const { Router } = require("express")
const user = require("./user.routes")
const project = require("./project.routes")
const router = Router()

router.use(user)
router.use(project)

module.exports = router