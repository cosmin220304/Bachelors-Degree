const db = require("../models");
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId;

module.exports.getUsers = async (req, res) => {
  try {
    const filter = req.query
    let pageSize = 100
    let pageNumber = 0

    if (filter.pageSize) pageSize = parseInt(filter.pageSize)
    if (filter.pageNumber) pageNumber = parseInt(filter.pageNumber)

    delete filter.pageSize
    delete filter.pageNumber

    users = await db.user.find(filter, {}, { skip: pageSize * pageNumber, limit: pageSize })
    if (!users || users.length == 0) return res.status(404).json({ error: "no users found!" })

    res.json(users)

  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

module.exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id
    if (!ObjectId.isValid(id)) return res.status(404).json({ error: "invalid mongodb id" })

    const user = await db.user.findOne({ _id: id })
    if (!user || user.length == 0) return res.status(404).json({ error: "user not found" })

    res.json(user[0])

  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

module.exports.updateUserById = async (req, res) => {
  try {
    const id = req.params.id
    if (!ObjectId.isValid(id)) return res.status(404).json({ error: "invalid mongodb id" })

    const found = await db.user.findOne({ _id: id })
    if (!found) return res.status(404).json({ error: "user not found" })

    if (!req.body || req.body === {}) return res.status(204).json({ message: "nothing was updated" })

    await db.user.updateOne(
      { _id: id },
      { $set: req.body }
    )
    res.sendStatus(200)

  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

module.exports.createUser = async (req, res) => {
  try {
    console.log({ ...req.body })
    const found = await db.user.findOne({ ...req.body })
    if (found) return res.status(409).json({ error: "user already exists!" })

    const user = await db.user.create({ ...req.body })
    res.status(201).json({user})

  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
};

module.exports.removeUserById = async (req, res) => {
  try {
    const id = req.params.id
    if (!ObjectId.isValid(id)) return res.status(404).json({ error: "user not found" })

    const found = await db.user.findOne({ _id: id })
    if (!found) return res.status(404).json({ error: "user not found" })

    await db.user.deleteOne({ _id: id })
    res.sendStatus(204)

  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
};