const mongoose = require('mongoose')
const { Schema } = mongoose

const routeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  data: {
    type: Object || Array
  }
})

module.exports = mongoose.model('Route', routeSchema)

