const express = require("express")
const router = require("./routes")
const path = require("path")
const mongoose = require("mongoose")
const axios = require("axios")
const port = process.env.PORT || 8000
require("dotenv").config()

const enviroment = process.env.NODE_ENV || require("./secret.js").NODE_ENV
let serviceMap = {
  "textReco": "http://localhost:8080/",
  "javascript": "http://localhost:8081/",
  "python": "http://localhost:8082/",
  "c": "http://localhost:8083/",
  "cpp": "http://localhost:8084/",
  "java": "http://localhost:8085/",
  "php": "http://localhost:8086/",
}
if (enviroment === "development") {
  serviceMap = {
    "textReco": "http://localhost:8080/",
    "javascript": "https://cosmin-afta-javascript.herokuapp.com/",
    "python": "https://cosmin-afta-python.herokuapp.com/",
    "c": "https://cosmin-afta-c.herokuapp.com/",
    "cpp": "https://cosmin-afta-cpp.herokuapp.com/",
    "java": "https://cosmin-afta-java.herokuapp.com/",
    "php": "https://cosmin-afta-php.herokuapp.com/",
  }
}

let mongo_uri = process.env.DB_URL
if (!mongo_uri) {
  const { DB_URL } = require("./secret.js")
  mongo_uri = DB_URL
}

mongoose
  .connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const app = express()
    app.use(express.static(path.join(__dirname, "build")))
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/ping", async (req, res) => res.send("Server is Up"))

    //User api
    app.use("/api", router)

    //Api gateway
    app.use("/code", async (req, res) => {
      try {
        const language = req.body.language
        const code = req.body.code
        console.log(req.body)

        const { data } = await axios({
          method: req.method,
          url: serviceMap[language],
          data: { code }
        })

        res.json(data)

      } catch (err) {
        console.log(err)
        res.sendStatus(500)
      }
    })

    app.get("**", (req, res) => res.sendFile(path.join(__dirname, "build", "index.html")))

    app.listen(port, () => console.log(`listening on ${port}`))
  })