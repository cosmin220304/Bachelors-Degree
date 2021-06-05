  
const { Router } = require("express");
const user = require("./user.routes");
const router = Router();

router.use(user);

module.exports = router;