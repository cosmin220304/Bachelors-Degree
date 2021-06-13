const jwt = require("jsonwebtoken")

module.exports.middleWare = (req, res, next) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1]
    if (!token) return res.status(401).json({ message: "Missing token" })
    if (!req.body) return res.status(400).json({ message: "Missing body" })

    const claims = jwt.decode(token, process.env.SECRET)
    req.user = claims
    req.token = req.headers.authorization
    next()
  } catch (error) {
    console.log(error.response ? error.response.data : error)
    res.sendStatus(500)
  }
}