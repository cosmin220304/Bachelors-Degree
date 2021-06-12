const express = require("express")
const fs = require("fs")
const { exec } = require("child_process")
const { v4: uuidv4 } = require('uuid')
const port = process.env.PORT || 8081
const options = { timeout: 600000, stdio: "inherit", shell: true, }

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/ping", (req, res) => res.send("JAVASCRIPT is up!"))

app.post("/", (req, res) => {
  try {
    const data = req.body.code
    const fileName = `${uuidv4()}.js`

    fs.writeFile(fileName, data, (err) => {
      if (err) return res.status(500).send(err)

      exec(`node ${fileName}`, options, (error, stdout, stderr) => {
        res.json({ stdout, stderr, error })
        fs.unlinkSync(fileName)
      })
    })

  } catch (err) {
    console.log("JAVASCRIPT => ", err)
    res.sendStatus(500)
  }
})

app.listen(port, () => {
  console.log(`JAVASCRIPT microservice listening on ${port}`)
})