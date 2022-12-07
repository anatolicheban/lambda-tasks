const asyncHandler = require('express-async-handler')
const Route = require('../model/Route')

const addRoute = asyncHandler(async (req, res) => {
  const name = req.url.slice(1)
  const data = req.body
  if (!data) return res.status(400).json({ 'message': 'Body is required' })
  if (name.length < 3 || name.length > 15) return res.status(400).json({ 'message': "Route path is incorrect" })


  const duplicate = await Route.findOne({ name }).lean()

  if (duplicate) return res.status(409).json({ message: `The name ${name} already exists` })

  const route = await Route.create({ name, data })
  console.log(route);
  res.status(201).json(route)
})

const getRoute = asyncHandler(async (req, res) => {
  const name = req.url.slice(1)
  if (name.length < 3 || name.length > 15) return res.status(400).json({ 'message': "Route path is incorrect" })

  const route = await Route.findOne({ name }).lean()
  if (!route) return res.status(404).json({ message: '404 Not Found' })

  res.status(200).json(route)
})

const updateRoute = asyncHandler(async (req, res) => {
  const name = req.url.slice(1)
  const data = req.body
  if (!data) return res.status(400).json({ 'message': 'Body is required' })
  if (name.length < 3 || name.length > 15) return res.status(400).json({ 'message': "Route path is incorrect" })


  const route = await Route.findOne({ name }).exec()

  if (!route) return res.status(404).json({ message: `404 Not Found` })

  route.name = name
  route.data = data

  const result = await route.save()
  console.log(result);
  res.status(200).json(result)
})

const deleteRoute = asyncHandler(async (req, res) => {
  const name = req.url.slice(1)
  if (name.length < 3 || name.length > 15) return res.status(400).json({ 'message': "Route path is incorrect" })

  const route = await Route.findOne({ name }).exec()
  if (!route) return res.status(404).json({ message: `404 Not Found` })

  const result = await route.deleteOne({ name })
  console.log(result);

  res.sendStatus(200)
})

module.exports = { addRoute, getRoute, updateRoute, deleteRoute }