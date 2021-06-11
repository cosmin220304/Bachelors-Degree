const fs = require("fs")
const express = require("express")
const { v4: uuidv4 } = require("uuid")
const { azureFormRecognize } = require("./services/azureFormRecognize")
const { saveImageAndGetUrl } = require('./services/imageBB')
const port = process.env.PORT || 8080
require('dotenv').config()

//Image redirect for azure
const herokuUrl = "todo"
const enviroment = process.env.NODE_ENV || require('./secret.js').NODE_ENV
const apiUrl = enviroment === "production" ? herokuUrl : `http://localhost:${port}`

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

app.post("/", async (req, res) => {
  const uuid = uuidv4()
  const fileName = `${uuid}.jpg`
  try {
    const base64Image = req.body.base64Image.split("base64,")[1]

    //Save image on server
    await asyncWriteFile(fileName, base64Image)

    //Image to url
    let url = `${apiUrl}/${uuid}`
    if (enviroment === "development") {
      url = await saveImageAndGetUrl(base64Image)
    }

    //Send image to apis
    const text = await azureFormRecognize(url)
    res.send({ text: text })

  } catch (err) {
    console.log("textReco => ", err)
    res.sendStatus(500)
  } finally {
    // Remove image
    const imgPath = `${__dirname}/${uuid}.jpg`
    fs.unlink(imgPath, (err) => console.log("textReco => ", err))
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