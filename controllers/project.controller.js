const db = require("../models")
const mongoose = require("mongoose")

module.exports.createProject = async (req, res) => {
  try {
    const id = req.params.id
    if (!req.user.admin && req.user.uid !== id) return res.status(401).json({ error: "you are not the user" })

    const foundUser = await db.user.findOne({ uid: id })
    if (!foundUser) return res.status(404).json({ error: "user doesn't exist!" })

    req.body.creationDate = new Date().toDateString()
    req.body.lastModifiedDate = new Date().toDateString()
    req.body.authorName = foundUser.username
    const project = await db.project.create({ ...req.body, owner: foundUser })

    foundUser.projects = [...foundUser.projects, project._id]
    await db.user.updateOne(
      { uid: foundUser.uid },
      { $set: foundUser }
    )

    res.status(201).json({ ...project._doc })

  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
};

module.exports.getProjects = async (req, res) => {
  try {
    const filter = req.query
    let pageSize = 20
    let pageNumber = 0

    if (filter.pageSize) pageSize = parseInt(filter.pageSize)
    if (filter.pageNumber) pageNumber = parseInt(filter.pageNumber)
    if (filter.title) filter.title = new RegExp(filter.title, 'i')

    delete filter.pageSize
    delete filter.pageNumber

    projects = await db.project.find(filter, {}, { skip: pageSize * pageNumber, limit: pageSize })
    if (!projects || projects.length == 0) return res.status(404).json({ error: "no project found!" })

    res.json(projects)

  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
};

module.exports.updateProjectById = async (req, res) => {
  try {
    const id = req.params.id
    const projectId = req.params.projectId
    if (!req.user.admin && req.user.uid !== id) return res.status(401).json({ error: "you are not the user" })

    const foundUser = await db.user.findOne({ uid: id })
    if (!foundUser) return res.status(404).json({ error: "user not found" })

    const foundProject = await db.project.findOne({ _id: projectId })
    if (!foundProject) return res.status(404).json({ error: "project not found" })

    if (!req.user.admin && !foundProject.owner.equals(foundUser._id)) return res.status(401).json({ error: "you are not the owner" })

    req.body.lastModifiedDate = new Date().toDateString()
    await db.project.updateOne(
      { _id: projectId },
      { $set: req.body }
    )
    res.sendStatus(200)

  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
};

module.exports.getProjectById = async (req, res) => {
  try {
    const projectId = req.params.projectId

    const project = await db.project.findOne({ _id: projectId })
    if (!project) return res.status(404).json({ error: "project not found" })

    res.json(project)

  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
};

module.exports.removeProjectById = async (req, res) => {
  try {
    const id = req.params.id
    const projectId = req.params.projectId
    if (!req.user.admin && req.user.uid !== id) return res.status(401).json({ error: "you are not the user" })

    const foundUser = await db.user.findOne({ uid: id })
    if (!foundUser) return res.status(404).json({ error: "user not found" })

    const foundProject = await db.project.findOne({ _id: projectId })
    if (!foundProject) return res.status(404).json({ error: "project not found" })

    if (!req.user.admin && !foundProject.owner.equals(foundUser._id)) return res.status(401).json({ error: "you are not the owner" })

    await db.project.deleteOne({ _id: projectId })
    res.sendStatus(204)

  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
};