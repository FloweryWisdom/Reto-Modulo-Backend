const express = require(`express`)
const postsUseCase = require(`../usecases/posts.usecase`)
const authMiddleware = require(`../middlewares/auth.middleware`)

const router = express.Router()


// Create a blog post -- POST 
router.post(`/`, authMiddleware, async (request, response) => {
  try {
    const post = { ...request.body, user: request.user.id }

    const newPost = await postsUseCase.createOne(post)

    response.status(201)
    response.json({
      message: `Post created`,
      data: {
        post: newPost
      }
    })
     
  } catch (error) {
    const status = error.name === `ValidationError` ? 400 : 500
    response.status(status)
    response.json({
      message: `Something went wrong`,
      error: error.message
    })
  }
})


// Get all posts -- GET
router.get(`/`, async (request, response) => {
  try {
    const titleFilter = request.query.title
    const user = request.query.user
    const allPosts = await postsUseCase.getAll(titleFilter, user)

    response.json({
      message: `Posts retrieved`,
      data: {
        posts: allPosts
      }
    })
  } catch (error) {
    const status = error.name === `ValidationError` ? 400 : 500
    response.status(status)
    response.json({
      message: `Something went wrong`,
      error: error.message
    })
  }
})

// Update the information of a blog post -- PATCH
router.patch(`/:id`, authMiddleware, async (request, response) => {
  try {
    const { id } = request.params
    const updatedPost = request.body

    const modifiedPost = await postsUseCase.updatePostById(id, updatedPost)

    response.json({
      message: `Post updated`,
      data: {
        post: modifiedPost
      }
    })

  } catch (error) {
    const status = error.name === `ValidationError` ? 400 : 500
    response.status(status)
    response.json({
      message: `Something went wrong`,
      error: error.message
    })
  }
})

// Delete a blog post -- DELETE 
router.delete(`/:id`, authMiddleware, async (request, response) => {
  try {
    const { id } = request.params
    const deletedPost = await postsUseCase.deletePostById(id)
    
    response.json({
      message: `Post deleted`,
      data: {
        post: deletedPost
      }
    })
  } catch (error) {
    const status = error.name === `ValidationError` ? 400 : 500
    response.status(status)
    response.json({
      message: `Something went wrong`,
      error: error.message
    })
  }
})








module.exports = router 