const mongoose = require(`mongoose`)

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 50,
    trim: true
  },
  image: {
    type: String,
    required: true,
    match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
    trim: true,
  },
  body: {
    type: String,
    required: true,
    maxLength: 200,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: `user`
  },
  created_at: {
    type: Date,
    required: true,
    default: new Date()
  },
  updated_at: {
    type: Date,
    required: true,
    default: new Date()
  }
})

module.exports = mongoose.model(`post`, postSchema)