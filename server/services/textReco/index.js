const fs = require("fs")
const express = require("express")
var FormData = require("form-data")
const { v4: uuidv4 } = require("uuid")
const axios = require("axios")
const { azureFormRecognize } = require("./services/azureFormRecognize")
const port = process.env.PORT || 8080

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/ping", (req, res) => res.send("textReco is up!"))

const saveImageAndGetUrl = async (base64Image) => {
  const data = new FormData()
  data.append("image", base64Image)
  let config = {
    method: "post",
    url: "https://api.imgbb.com/1/upload?key=241bf1e868ee22d45fb48e1560520fa6",
    headers: {
      ...data.getHeaders()
    },
    data: data
  }

  const { data: response } = await axios(config)
  return response.data.url
}

app.post("/", async (req, res) => {
  try {
    // //TODO REPLACE IMGBB
    // fs.writeFile(`${uuidv4()}.jpg`, base64Image, "base64", (err) => {
    //   console.log(err)
    // })

    const base64Image = req.body.base64Image.split("base64,")[1]
    const url = await saveImageAndGetUrl(base64Image)

    const text = await azureFormRecognize(url)
    res.send({ text: text })

  } catch (err) {
    console.log("textReco => ", err)
    res.sendStatus(500)
  }
})

app.get("/:id", (req, res) => {
  try {

  } catch (err) {

  }
})

app.listen(port, () => {
  console.log(`textReco microservice listening on ${port}`)
})