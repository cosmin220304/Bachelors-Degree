const jwt = require("jsonwebtoken")

module.exports.middleWare = (req, res, next) => {
  try {
    console.log(req.body, req.headers)
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1]
    if (!token) return res.status(401).json({ message: "Missing token" })

    const claims = jwt.decode(token, process.env.SECRET || require("./secret.js.js").SECRET)
    req.user = claims
    req.token = `Bearer ${process.env.JWT || require("./secret.js.js").JWT}`
    next()
  } catch (error) {
    console.log(error.response ? error.response.data : error)
    res.sendStatus(500)
  }
}