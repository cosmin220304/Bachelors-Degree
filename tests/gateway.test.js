const axios = require("axios")
let url = "https://pocketide-api.herokuapp.com"
require("dotenv").config()
const JWT = process.env.JWT || require("./secret.js").JWT

describe.skip("gateway negative tests", () => {
  jest.setTimeout(20000)

  it("no jwt should return error", async () => {
    const config = {
      method: "post",
      url: `${url}/compile`,
      headers: {
        "Content-Type": "application/json"
      },
    };

    let error = null
    try {
      await axios(config)
    } catch (err) {
      error = err
    }
    expect(error).not.toBeNull()
  })

  it("field code should be required for /compile", async () => {
    const config = {
      method: "post",
      url: `${url}/compile`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JWT}`
      },
      data: {
        language: "python",
      }
    };

    let error = null
    try {
      await axios(config)
    } catch (err) {
      error = err.response.data
    }
    expect(error).not.toBeNull()
    expect(error).toHaveProperty("message", "Field code is required!")
  })

  it("field language should be required for /compile", async () => {
    const config = {
      method: "post",
      url: `${url}/compile`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JWT}`
      },
      data: {
        code: "print(\"Hello world!\")"
      }
    };

    let error = null
    try {
      await axios(config)
    } catch (err) {
      error = err.response.data
    }
    expect(error).not.toBeNull()
    expect(error).toHaveProperty("message", "Field language is required!")
  })

  it("unsupported language should return error", async () => {
    const config = {
      method: "post",
      url: `${url}/compile`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JWT}`
      },
      data: {
        language: "HolyC",
        code: "U0 Hello(){\"Hello World\n\";}"
      }
    };

    let error = null
    try {
      await axios(config)
    } catch (err) {
      error = err.response.data
    }
    expect(error).not.toBeNull()
    expect(error).toHaveProperty("message", "Language not supported!")
  })

  it("field language should be required for /recognize", async () => {
    const config = {
      method: "post",
      url: `${url}/recognize`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JWT}`
      },
      data: {
        code: "print(\"Hello world!\")"
      }
    };

    let error = null
    try {
      await axios(config)
    } catch (err) {
      error = err.response.data
    }
    expect(error).not.toBeNull()
    expect(error).toHaveProperty("message", "Field language is required!")
  })

  it("field base64Image should be required for /recognize", async () => {
    const config = {
      method: "post",
      url: `${url}/recognize`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JWT}`
      },
      data: {
        language: "python"
      }
    };

    let error = null
    try {
      await axios(config)
    } catch (err) {
      error = err.response.data
    }
    expect(error).not.toBeNull()
    expect(error).toHaveProperty("message", "Field base64Image is required!")
  })
})