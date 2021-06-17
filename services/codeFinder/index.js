const jwt = require("jsonwebtoken")
const axios = require("axios")
const express = require("express")
const port = process.env.PORT || 8079
const algorithmia = require("algorithmia")
require("dotenv").config()

const enviroment = process.env.NODE_ENV || "development"
const textRecoApi = enviroment === "development" ? "http://localhost:8080" : "https://cosmin-afta-text-reco.herokuapp.com/"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/ping", (req, res) => res.send("codeFinder is up!"))

const middleWare = (req, res, next) => {
  try {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1]
    if (!token) return res.status(401).json({ message: "Missing token" })

    const claims = jwt.decode(token, process.env.SECRET || require("./secret.js").SECRET)
    req.user = claims
    req.token = req.headers.authorization
    next()

  } catch (error) {
    console.log(error.response ? error.response.data : error)
    res.sendStatus(500)
  }
}

const getProbability = (input, language) => {
  return new Promise((resolve, reject) => {
    try {
      algorithmia.client(process.env.ALGORITHMIA_KEY || require("./secret.js").ALGORITHMIA_KEY)
        .algo("PetiteProgrammer/ProgrammingLanguageIdentification/0.1.3")
        .pipe(input)
        .then((response) => resolve(
          response.result.find(r => r[0] === language)[1]
        ))
    } catch (err) {
      console.log(err)
      reject(0)
    }
  })
}

app.post("/", middleWare, async (req, res) => {
  try {
    const base64Image = req.body.base64Image
    const language = req.body.language

    const config = {
      method: 'post',
      url: textRecoApi,
      headers: {
        'Authorization': req.token,
        'Content-Type': 'application/json'
      },
      data: { base64Image }
    };
    const { data } = await axios(config)

    const { azure_text: A, google_text: G } = data
    const closedBracketsLikeCharacters = "5S3}"
    let code = ""
    let i = 0; const n = A.length
    let j = 0; const m = G.length

    while (i < n && j < m) {
      if (A[i].length === 1 && G[j].length === 1) {
        i += 1
        j += 1
        if (A[i] === "") continue
        if (closedBracketsLikeCharacters.includes(A[i]) || closedBracketsLikeCharacters.includes(G[i])) {
          code += "}"
        }
        else {
          code += "{"
        }
      }
      else if (A[i].length === 1) {
        i += 1
        if (A[i] === "") continue
        code += closedBracketsLikeCharacters.includes(A[i]) ? "}" : "{"
      }
      else if (G[j].length === 1) {
        j += 1
        if (G[j] === "") continue
        code += closedBracketsLikeCharacters.includes(G[j]) ? "}" : "{"
      }
      else {
        code += getProbability(A[i], language) > getProbability(G[j], language) ? A[i] : G[j]
        i++;
        j++;
      }
      code += "\r\n"
    }

    res.json({ code })

  } catch (err) {
    console.log("codeFinder => ", err)
    res.sendStatus(500)
  }
})

app.listen(port, () => {
  console.log(`codeFinder microservice listening on ${port}`)
})