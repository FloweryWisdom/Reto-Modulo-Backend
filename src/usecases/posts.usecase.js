const postModel = require(`../models/posts.model`)
const mongoose = require(`mongoose`)
const createError = require(`http-errors`)
const userModel = require(`../models/user.model`)

// POST /posts
async function createOne(post) {

  //validate if user id has a valid format
 /*  if (!mongoose.isValidObjectId(post.user)) {
    throw new createError(400, `Invalid user id`)
  }

  //validate is user exists in database
  const user = await userModel.findById(post.user)

  if (!user) {
    throw new createError(404, `User not found`)
  } */

  return newPost = await postModel.create(post)
}

// GET /posts/:id
async function getById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, `Invalid post id`)
  }

  const post = await postModel.findById(id)

  if (!post) {
    throw new createError(404, `Post not found`)
  }

  return post 
}


module.exports = {
  createOne,
  getById,
}