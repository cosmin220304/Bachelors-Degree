const jwt = require("jsonwebtoken")
const express = require("express")
const port = process.env.PORT || 8079
require("dotenv").config()

//Image redirect for azure
const heroTextRecoUrl = "todo"
const localTextRecoUrl = "http://localhost:8080"
const enviroment = process.env.NODE_ENV || require("./secret.js").NODE_ENV
const textRecoApi = enviroment === "production" ? heroTextRecoUrl : localTextRecoUrl

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/ping", (req, res) => res.send("codeFinder is up!"))

const middleWare = (req, res, next) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1]
    if (!token) return res.status(401).json({ message: "Missing token" })

    const claims = jwt.decode(token, process.env.SECRET || require("./secret.js").SECRET)
    req.user = claims
    next()

  } catch (error) {
    console.log(error.response ? error.response.data : error)
    res.sendStatus(500)
  }
}

app.post("/", middleWare, async (req, res) => {
  try {
    //const base64Image = req.body.base64Image

    res.send({ "message": "ok" })

  } catch (err) {
    console.log("codeFinder => ",
      err.response
        ? JSON.stringify(err.response.data)
        : err
    )
    res.sendStatus(500)
  }
})

app.listen(port, () => {
  console.log(`codeFinder microservice listening on ${port}`)
})