const db = require("../models")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")

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

    res.json(users.map(u => ({ uid: u.uid, username: u.username })))

  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

module.exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id

    const user = await db.user.findOne({ uid: id })
    if (!user || user.length == 0) return res.status(404).json({ error: "user not found" })

    const token = await jwt.sign({ uid: user.uid }, process.env.SECRET || require("../secret").SECRET);
    res.json({ ...user._doc, token })

  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

module.exports.updateUserById = async (req, res) => {
  try {
    const id = req.params.id
    if (!req.user.admin && req.user.uid !== id) return res.status(401).json({ error: "you are not the user" })

    const found = await db.user.findOne({ uid: id })
    if (!found) return res.status(404).json({ error: "user not found" })

    if (!req.body || req.body === {}) return res.status(204).json({ message: "nothing was updated" })

    if (req.body.uid) delete req.body.uid
    if (req.body.phoneNumber) delete req.body.phoneNumber

    await db.user.updateOne(
      { uid: id },
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
    const found = await db.user.findOne({ ...req.body })
    if (found) return res.status(409).json({ error: "user already exists!" })

    const user = await db.user.create({ ...req.body })
    res.status(201).json({ user })

  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
};

module.exports.removeUserById = async (req, res) => {
  try {
    const id = req.params.id
    if (!req.user.admin && req.user.uid !== id) return res.status(401).json({ error: "you are not the user" })

    const found = await db.user.findOne({ uid: id })
    if (!found) return res.status(404).json({ error: "user not found" })

    await db.user.deleteOne({ uid: id })
    res.sendStatus(204)

  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
};

module.exports.createProject = async (req, res) => {
  try {
    const id = req.params.id
    if (!req.user.admin && req.user.uid !== id) return res.status(401).json({ error: "you are not the user" })

    const foundUser = await db.user.findOne({ uid: id })
    if (!foundUser) return res.status(404).json({ error: "user doesn't exist!" })

    req.body.creationDate = new Date()
    const project = await db.project.create({ ...req.body, owner: foundUser })

    foundUser.projects = [...foundUser.projects, project._id]
    await db.user.updateOne(
      { uid: foundUser.uid },
      { $set: foundUser }
    )

    res.status(201).json({ project })

  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
};