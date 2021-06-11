const express = require("express")
const axios = require("axios")
var FormData = require("form-data")
const fs = require("fs")
const { v4: uuidv4 } = require("uuid")
const port = process.env.PORT || 8080

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/ping", (req, res) => res.send("textReco is up!"))

app.post("/", async (req, res) => {
  try {
    //const base64Image = req.body.base64Image.split(",")[1]
    //TODO REPLACE IMGBB
    // fs.writeFile(`${uuidv4()}.png`, base64Image, "base64", (err) => {
    //   console.log(err);
    // });

    const base64Image = req.body.base64Image.split(";base64,")[1]
    const data = new FormData()
    data.append("image", base64Image)
    var config = {
      method: "post",
      url: "https://api.imgbb.com/1/upload?key=241bf1e868ee22d45fb48e1560520fa6",
      headers: {
        ...data.getHeaders()
      },
      data: data
    };

    const response = await axios(config)
    res.json({ ...response.data })


    /*
    var imgbbPostResult = await imgbbClient.PostAsync($"/1/upload?key={ImgbbApiKey}",
            new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("image", base64Image)
            })
        );
        var imgbbModelString = await imgbbPostResult.Content.ReadAsStringAsync();
        var imgbbModel = JsonConvert.DeserializeObject<ImgbbDto>(imgbbModelString);
        var imgUrl = imgbbModel.data.url;

    var formRecognizerJson = JsonConvert.SerializeObject(new FormRecognizePostDto
    {
        source = imgUrl
    });

    var formRecognizerPostResult = await formRecognizerClient.PostAsync(
        "/formrecognizer/v2.1-preview.3/layout/analyze",
        new StringContent(formRecognizerJson, Encoding.UTF8, "application/json")
    );
    var fullUrlLocation = formRecognizerPostResult.Headers.GetValues("Operation-Location").FirstOrDefault();
    var path = fullUrlLocation.Split(new string[] { "https://reco.cognitiveservices.azure.com" }, StringSplitOptions.None)[1];

    Thread.Sleep(5000);
    var recognizedTextResponse = await formRecognizerClient.GetAsync(path);
    var text = await recognizedTextResponse.Content.ReadAsStringAsync();
    return text;
        }
    */


  } catch (err) {
    console.log("textReco => ", err)
    res.status(500)
  }
})

app.get("/:id", (req, res) => {
  try {

  } catch (err) {

  }
})

app.listen(port, () => {
  console.log(`textReco microservice listening on ${port}`)
})