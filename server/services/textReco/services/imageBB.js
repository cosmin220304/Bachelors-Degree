var FormData = require("form-data")
const axios = require("axios")

module.exports.saveImageAndGetUrl = async (base64Image) => {
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

  console.log(response.data)
  return response.data.url
}
