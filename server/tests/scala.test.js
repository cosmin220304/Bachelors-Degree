const axios = require("axios")
const url = "https://cosmin-afta-scala.herokuapp.com/"
require("dotenv").config()
const JWT = process.env.JWT || require("./secret.js").JWT

describe.skip("scala microservice tests", () => {
  jest.setTimeout(20000)

  it("scala hello world program should return accordingly", async () => {
    var body = JSON.stringify({
      "code": "object Hello { def main(args: Array[String]) = { println(\"Hello World!\")}}"
    });

    var config = {
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
    var body = JSON.stringify({
      "code": "print(\"Hello World!\")"
    });

    var config = {
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
    var body = JSON.stringify({
      "code": "#include <stdio.h> \r\n int main() { \r\n printf(\"Hello World!\"); \r\n return 0;}"
    });

    var config = {
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