const mongoose = require(`mongoose`)

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
    trim: true
  },
  profilePic: {
    type: String,
    required: true,
    match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
    trim: true
  },
  email: {
    type: String,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  created_at: {
    type: Date,
    required: true,
    default: new Date()
  },
  /* updated_at: {
    type: Date,
    required: true,
    default: new Date()
  } */
})

module.exports = mongoose.model(`user`, userSchema)