const express = require("express")
const router = require("./routes")
const path = require("path")
const mongoose = require("mongoose")
const axios = require("axios")
const port = process.env.PORT || 8080
require('dotenv').config()

const serviceMap = {
  "javascript": "http://localhost:8081/",
  "python": "http://localhost:8082/",
  "cpp": "http://localhost:8083/",
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
    app.use(express.static(path.join(__dirname, 'build')))
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/ping", async (req, res) => res.send("Server is Up"))
    app.use("/api", router)

    app.use("/code", async (req, res) => {
      try {
        const language = req.body.language
        const code = req.body.code
        console.log(req.body)

        const { data } = axios({
          method: req.method,
          url: serviceMap[language],
          data: { code }
        })

        res.json(data)

      } catch (err) {
        console.log(err)
        res.status(500)
      }
    })

    app.get("**", (req, res) => res.sendFile(path.join(__dirname, "build", "index.html")))

    app.listen(port, () => console.log(`listening on ${port}`))
  })