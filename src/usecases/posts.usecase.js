const postModel = require(`../models/posts.model`)
const mongoose = require(`mongoose`)
const createError = require(`http-errors`)
const userModel = require(`../models/user.model`)

// POST /posts
async function createOne(post) {

  return newPost = await postModel.create(post)
}

// GET /posts/
async function getAll(titleFilter, user) {
  const filters = {}

  if (titleFilter) {
    filters.title = new RegExp(titleFilter, `i`)
  }

  if (user && mongoose.isValidObjectId(user)) {
    filters.user = user
  }

  const allPosts = await postModel.find(filters).populate({
    path: `user`,
    select: `name`
  })
  return allPosts
} 


// PATCH /posts/:id
async function updatePostById(id, updatedPost) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, `Invalid post id`)
  }

  if (updatedPost.user) {
    throw new createError(403, `Not allowed to change the author of the post`)
  }

  updatedPost.updated = new Date()

  const modifiedPost = await postModel.findByIdAndUpdate(id, updatedPost, {
    new: true,
    runValidators: true
  })

  if (!modifiedPost) {
    throw new createError(404, `Post not found`)
  }

  return modifiedPost

}

// DELETE /posts/:id
async function deletePostById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, `Invalid post id`)
  }

  const deletedPost = await postModel.findByIdAndDelete(id) 

  if(!deletedPost) {
    throw new createError(404, `Post not found`)
  }

  return deletedPost
}


module.exports = {
  createOne,
  getAll,
  updatePostById,
  deletePostById
}
