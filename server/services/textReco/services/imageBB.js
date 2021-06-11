var FormData = require("form-data")
const axios = require("axios")
require('dotenv').config()

const imageBB_key = process.env.IMAGEBB_key || require('./secret.js').IMAGEBB_key

module.exports.saveImageAndGetUrl = async (base64Image) => {
  const data = new FormData()
  data.append("image", base64Image)
  let config = {
    method: "post",
    url: `https://api.imgbb.com/1/upload?key=${imageBB_key}`,
    headers: {
      ...data.getHeaders()
    },
    data: data
  }

  const { data: response } = await axios(config)

  return response.data.url
}
