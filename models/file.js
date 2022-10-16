const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  alias: {
    type: String,
    required: true
  },
  original_name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('File', schema)