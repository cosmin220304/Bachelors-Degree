const express = require("express")
const fs = require("fs")
const { exec } = require("child_process")
const { v4: uuidv4 } = require('uuid')
const port = process.env.PORT || 8083
const options = { timeout: 600000, stdio: "inherit", shell: true, }

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/ping", (req, res) => res.send("CPP is up!"))

app.post("/", (req, res) => {
  try {
    const data = req.body.code
    const fileName = `${uuidv4()}.cpp`

    fs.writeFile(fileName, data, (err) => {
      if (err) return res.status(500).send(err)

      const exeutableName = `${uuidv4()}`
      exec(`gcc ${fileName} -o ${exeutableName}`, options, (error, stdout, stderr) => {
        if (stderr || err) return res.json({ stdout, stderr, error })

        fs.unlinkSync(fileName)
        exec(`./${exeutableName}`, options, (error, stdout, stderr) => {
          res.json({ stdout, stderr, error })
          fs.unlinkSync(exeutableName)
        })
      })

    })

  } catch (err) {
    console.log("CPP => ", err)
    res.sendStatus(500)
  }
})

app.listen(port, () => {
  console.log(`CPP microservice listening on ${port}`)
})