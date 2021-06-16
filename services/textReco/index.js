const jwt = require("jsonwebtoken")
const fs = require("fs")
const express = require("express")
const { v4: uuidv4 } = require("uuid")
const { azureFormRecognize } = require("./services/azureFormRecognize")
const { googleCloudVision } = require("./services/googleCloudVision")
const { saveImageAndGetUrlFromImageBB } = require("./services/imageBB")
const { ocrSpace } = require("./services/ocrSpace")
const port = process.env.PORT || 8080
require("dotenv").config()

const enviroment = process.env.NODE_ENV || require("./secret.js").NODE_ENV
const apiUrl = enviroment === "development" ? `http://localhost:${port}` : "https://cosmin-afta-text-reco.herokuapp.com"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/ping", (req, res) => res.send("textReco is up!"))

const asyncWriteFile = (fileName, base64Image) => {
  return new Promise((res, rej) => {
    fs.writeFile(fileName, base64Image, "base64", (err) => {
      if (err) rej(err)
      else res()
    })
  })
}

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
  const uuid = uuidv4()
  const fileName = `${uuid}.jpg`
  const imgPath = `${__dirname}/${uuid}.jpg`
  try {
    const base64Image = req.body.base64Image.split("base64,")[1]

    //Save image on server
    await asyncWriteFile(fileName, base64Image)

    //Image to url
    let url = `${apiUrl}/${uuid}`
    if (enviroment === "development") {
      url = await saveImageAndGetUrlFromImageBB(base64Image)
    }

    //Send image to apis
    const ocr_space_text = ocrSpace(req.body.base64Image)
    const azure_text = azureFormRecognize(url)
    const google_text = googleCloudVision(base64Image)

    const all_results = {
      ocr_space_text: await ocr_space_text,
      azure_text: await azure_text,
      google_text: await google_text,
    }
    res.json({ ...all_results })

  } catch (err) {
    console.log("textReco => ", err)
    res.sendStatus(500)
  } finally {
    fs.unlink(imgPath, (err) => console.log("textReco removing image => ", err))
  }
})


app.get("/:id", (req, res) => {
  try {
    const id = req.params.id
    const image = `${__dirname}/${id}.jpg`
    res.sendFile(image)
  } catch (err) {
    console.log("textReco => ", err)
    res.sendStatus(500)
  }
})

app.listen(port, () => {
  console.log(`textReco microservice listening on ${port}`)
})