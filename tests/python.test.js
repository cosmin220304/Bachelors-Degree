const axios = require("axios")
const url = "https://cosmin-afta-python.herokuapp.com/"
require("dotenv").config()
const JWT = process.env.JWT || require("./secret.js").JWT

describe.skip("python microservice tests", () => {
  it("python hello world program should return accordingly", async () => {
    const body = JSON.stringify({
      "code": "print(\"Hello World!\")"
    });

    const config = {
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JWT}`
      },
      data: body
    };

    const { data } = await axios(config)
    expect(data).toHaveProperty("stdout", "Hello World!\n")
    expect(data).toHaveProperty("stderr", "")
    expect(data).toHaveProperty("error", null)
  })

  it("no jwt should return error", async () => {
    const body = JSON.stringify({
      "code": "print(\"Hello World!\")"
    });

    const config = {
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json"
      },
      data: body
    };

    let error = null
    try {
      await axios(config)
    } catch (err) {
      error = err
    }
    expect(error).not.toBeNull()
  })

  it("c hello world program should return error", async () => {
    const body = JSON.stringify({
      "code": "#include <stdio.h> \r\n int main() { \r\n printf(\"Hello World!\"); \r\n return 0;}"
    });

    const config = {
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${JWT}`
      },
      data: body
    };

    const { data } = await axios(config)
    expect(data).toHaveProperty("stdout", "")
    expect(data).not.toHaveProperty("stderr", "")
    expect(data).not.toHaveProperty("error", null)
  })

})