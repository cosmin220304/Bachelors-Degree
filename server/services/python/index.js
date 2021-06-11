const express = require("express")
const fs = require("fs")
const { exec } = require("child_process")
const { v4: uuidv4 } = require('uuid')
const port = process.env.PORT || 8082
const options = { timeout: 600000, stdio: "inherit", shell: true, }

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/ping", (req, res) => res.send("PYTHON is up!"))

app.post("/", (req, res) => {
  try {
    const data = req.body.code
    const fileName = `${uuidv4()}.py`

    fs.writeFile(fileName, data, (err) => {
      if (err) return res.status(500).send(err)

      exec(`python ${fileName}`, options, (error, stdout, stderr) => {
        res.json({ stdout, stderr, error })
        fs.unlinkSync(fileName)
      })
    })

  } catch (err) {
    console.log("PYTHON => ", err)
    res.sendStatus(500)
  }
})

app.listen(port, () => {
  console.log(`PYTHON microservice listening on ${port}`)
})