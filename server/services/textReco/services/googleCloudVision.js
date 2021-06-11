const axios = require("axios")
require('dotenv').config()

const google_key = process.env.GOOGLE_KEY || require('./secret.js').GOOGLE_KEY

module.exports.googleCloudVision = async (base64Image) => {
  try {
    const body = JSON.stringify({
      "requests": [{
        "image": { "content": base64Image },
        "features": [{ "type": "DOCUMENT_TEXT_DETECTION" }]
      }]
    })

    const config = {
      method: "post",
      url: `https://vision.googleapis.com/v1/images:annotate?key=${google_key}`,
      headers: {
        "Content-Type": "application/json"
      },
      data: body
    };

    const { data } = await axios(config)
    return data.responses[0].fullTextAnnotation.text.split("\n")

  } catch (err) {
    console.log("textReco -> google => ", err.response.data)
    return null
  }
}