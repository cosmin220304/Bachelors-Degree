const axios = require("axios")
require('dotenv').config()

const sleep = (sec) => {
  console.log(`sleeping ${sec} seconds`)
  return new Promise(r => setTimeout(r, sec * 1000))
}

const azure_key = process.env.AZURE_KEY || require('./secret.js').AZURE_KEY

module.exports.azureFormRecognize = async (url) => {
  try {
    let config = {
      method: "post",
      url: "https://reco.cognitiveservices.azure.com/formrecognizer/v2.1-preview.3/layout/analyze/",
      headers: {
        "Ocp-Apim-Subscription-Key": azure_key,
        "Content-Type": "application/json"
      },
      data: {
        source: url
      }
    }

    const formRecoPostResponse = await axios(config)
    const location = formRecoPostResponse.headers["operation-location"]

    await sleep(5)

    config = {
      method: "get",
      url: location,
      headers: {
        "Ocp-Apim-Subscription-Key": azure_key,
        "Content-Type": "application/json"
      },
    }

    const formRecoGetResponse = await axios(config)
    return formRecoGetResponse.data.analyzeResult.readResults[0].lines.map(l => l.text)

  } catch (err) {
    console.log("textReco -> azure => ", err)
    return []
  }
}

