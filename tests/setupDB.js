/* istanbul ignore file */
//code taken from here https://zellwk.com/blog/jest-and-mongoose/
//used for setting up unit tests with mongoose

const mongoose = require("mongoose")
mongoose.set("useCreateIndex", true)
mongoose.promise = global.Promise
require('dotenv').config();

module.exports = {
  setupDB() {
    beforeAll(async () => {
      let mongo_uri = process.env.TEST_DB_URL
      if (!mongo_uri) {
        const { TEST_DB_URL } = require("../secret.js")
        mongo_uri = TEST_DB_URL
      }
      await mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true })
    })

    afterEach(async () => {
      const collections = Object.keys(mongoose.connection.collections)
      for (const collectionName of collections) {
        if (collectionName.includes("Test")) {
          const collection = mongoose.connection.collections[collectionName]
          await collection.deleteMany()
        }
      }
    })

    afterAll(async () => {
      const collections = Object.keys(mongoose.connection.collections)
      for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName]
        try {
          await collection.drop()
        } catch (error) {
          if (error.message === "ns not found") return
          if (error.message.includes("a background operation is currently running")) return
          console.log(error.message)
        }
      }
      await mongoose.connection.close()
    })
  }
}