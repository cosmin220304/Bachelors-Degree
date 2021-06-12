const axios = require("axios")
const url = "https://cosmin-afta-javascript.herokuapp.com/"

describe("javascript microservice tests", () => {
  it("javascript hello world program should return accordingly", async () => {
    var body = JSON.stringify({
      "code": "console.log(\"Hello World!\")"
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
    expect(data).toHaveProperty("stdout", "Hello World!\n")
    expect(data).toHaveProperty("stderr", "")
    expect(data).toHaveProperty("error", null)
  })

  it("c hello world program should return error", async () => {
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
    expect(data).toHaveProperty("stdout", "")
    expect(data).not.toHaveProperty("stderr", "")
    expect(data).not.toHaveProperty("error", null)
  })

})