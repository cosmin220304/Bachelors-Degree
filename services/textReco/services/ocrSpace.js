const axios = require("axios")
const FormData = require("form-data")
require("dotenv").config()

const ocr_space_key = process.env.OCR_SPACE_KEY || require('./secret.js').OCR_SPACE_KEY

module.exports.ocrSpace = async (base64Image) => {
  try {
    const formData = new FormData();
    formData.append("base64Image", base64Image)
    const config = {
      method: "post",
      url: "https://api.ocr.space/parse/image",
      headers: {
        "apikey": ocr_space_key,
        ...formData.getHeaders()
      },
      data: formData
    }

    const { data } = await axios(config)
    return data.ParsedResults[0].ParsedText.split("\r\n")

  } catch (err) {
    console.log("textReco -> ocr space => ", err)
    return []
  }
}