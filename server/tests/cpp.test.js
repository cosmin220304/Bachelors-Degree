const axios = require("axios")
const url = "https://cosmin-afta-cpp.herokuapp.com/"
require("dotenv").config()
const JWT = process.env.JWT || require("./secret.js").JWT

describe("cpp microservice tests", () => {
  it("c++ hello world program should return accordingly", async () => {
    var body = JSON.stringify({
      "code": "#include <iostream> \r\n int main() { \r\n std::cout << \"Hello World!\"; \r\n return 0;}"
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
    expect(data).toHaveProperty("stdout", "Hello World!")
    expect(data).toHaveProperty("stderr", "")
    expect(data).toHaveProperty("error", null)
  })

  it("no jwt should return error", async () => {
    var body = JSON.stringify({
      "code": "#include <iostream> \r\n int main() { \r\n std::cout << \"Hello World!\"; \r\n return 0;}"
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

    let error = null
    try {
      await axios(config)
    } catch (err) {
      error = err
    }
    expect(error).not.toBeNull()
  })

  it("c hello world program should return accordingly", async () => {
    var body = JSON.stringify({
      "code": "#include <stdio.h> \r\n int main() { \r\n printf(\"Hello World!\"); \r\n return 0;}"
    });

    var config = {
      method: "post",
      url: url,
      headers: {
        "Content-Type": "application/json"
      },
      data: body
    };

    const { data } = await axios(config)
    expect(data).toHaveProperty("stdout", "Hello World!")
    expect(data).toHaveProperty("stderr", "")
    expect(data).toHaveProperty("error", null)
  })

  it("python hello world program should return error", async () => {
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

    const { data } = await axios(config)
    expect(data).toHaveProperty("stdout", "")
    expect(data).not.toHaveProperty("stderr", "")
    expect(data).not.toHaveProperty("error", null)
  })
})