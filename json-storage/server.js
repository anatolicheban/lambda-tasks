const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const logger = require('./middleware/logger')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const rootRoute = require('./routes/root')
require('dotenv').config()

const PORT = process.env.PORT || 3500

connectDB()

const app = express()

app.use(express.json())
app.use(cors(corsOptions))
app.use(logger)

app.use('/', rootRoute)

app.all('*', (req, res) => {
  res.status(404).send(`404 Not Found`)
})

mongoose.connection.once('open', () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server runing on port ${PORT}`))
})