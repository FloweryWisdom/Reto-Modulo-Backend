const express = require(`express`)
const postsUseCase = require(`../usecases/posts.usecase`)
const authMiddleware = require(`../middlewares/auth.middleware`)

const router = express.Router()


// Create a blog post -- POST 
router.post(`/`, authMiddleware, async (request, response) => {
  try {
    const post = { ...request.body, user: request.user.id }
    
    console.log("Request user", request.user)
    console.log("Constructed post:", post)
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

// Get post by id -- GET
router.get(`/:id`, async (request, response) => {
  try {
    const { id } = request.params 
    post = await postsUseCase.getById(id)

    if(!post) {
      return response.status(404).json({message: `Post not found`})
    }
    response.json({
      message: `Post retrieved`,
      data: post 
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