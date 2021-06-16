const express = require("express")
const router = require("./routes")
const path = require("path")
const mongoose = require("mongoose")
const axios = require("axios")
const { middleWare } = require("./middleWare")
const port = process.env.PORT || 8000
require("dotenv").config()

const enviroment = process.env.NODE_ENV || require("./secret.js").NODE_ENV
let serviceMap = { //production
  "codeFinder": "https://cosmin-afta-code-finder.herokuapp.com/",
  "textReco": "https://cosmin-afta-text-reco.herokuapp.com/",
  "javascript": "https://cosmin-afta-javascript.herokuapp.com/",
  "python": "https://cosmin-afta-python.herokuapp.com/",
  "c": "https://cosmin-afta-c.herokuapp.com/",
  "cpp": "https://cosmin-afta-cpp.herokuapp.com/",
  "java": "https://cosmin-afta-java.herokuapp.com/",
  "php": "https://cosmin-afta-php.herokuapp.com/",
  "haskell": "https://cosmin-afta-haskell.herokuapp.com/",
  "scala": "https://cosmin-afta-scala.herokuapp.com/",
}
if (enviroment === "development") {
  serviceMap = {
    "codeFinder": "http://localhost:8079/",
    "textReco": "http://localhost:8080/",
    "javascript": "http://localhost:8081/",
    "python": "http://localhost:8082/",
    "c": "http://localhost:8083/",
    "cpp": "http://localhost:8084/",
    "java": "http://localhost:8085/",
    "php": "http://localhost:8086/",
    "haskell": "http://localhost:8087/",
    "scala": "http://localhost:8088/",
  }
}
const acceptedLangauges = ["javascript", "python", "c", "cpp", "java", "php", "haskell", "scala"]

const db_url = process.env.DB_URL || require("./secret.js").DB_URL
mongoose
  .connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const app = express()
    app.use(express.static(path.join(__dirname, "client/build")))
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/ping", async (req, res) => res.send("Server is Up"))

    //User api
    app.use("/api", router)

    //Api gateway
    app.use("/api/recognize", middleWare, async (req, res) => {
      try {
        const language = req.body.language
        const base64Image = req.body.base64Image

        if (!language) return res.status(400).json({ "message": "Field language is required!" })
        if (!acceptedLangauges.includes(language)) return res.status(400).json({ "message": "Language not supported!" })
        if (!base64Image) return res.status(400).json({ "message": "Field base64Image is required!" })

        const { data } = await axios({
          method: "post",
          url: serviceMap["codeFinder"],
          headers: {
            "Content-Type": "application/json",
            "Authorization": req.token
          },
          data: JSON.stringify({ base64Image, language })
        })

        res.json({ ...data })

      } catch (err) {
        console.log(err)
        res.sendStatus(500)
      }
    })

    //Api gateway
    app.use("/api/compile", middleWare, async (req, res) => {
      try {
        const language = req.body.language
        const code = req.body.code

        if (!language) return res.status(400).json({ "message": "Field language is required!" })
        if (!acceptedLangauges.includes(language)) return res.status(400).json({ "message": "Language not supported!" })
        if (!code) return res.status(400).json({ "message": "Field code is required!" })

        const { data } = await axios({
          method: "post",
          url: serviceMap[language],
          headers: {
            "Content-Type": "application/json",
            "Authorization": req.token
          },
          data: JSON.stringify({ code })
        })
        res.json({ ...data })

      } catch (err) {
        console.log(err)
        res.sendStatus(500)
      }
    })

    app.get("/api/languages", (req, res) => res.json({ languages: acceptedLangauges }))

    app.get("*", (req, res) => res.sendFile(path.join(__dirname + '/client/build/index.html')))

    app.listen(port, () => console.log(`listening on ${port}`))
  })