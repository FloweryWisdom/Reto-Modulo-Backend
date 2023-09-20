const express = require(`express`)
const userUseCase = require(`../usecases/user.usecase`)
const authMiddleware = require(`../middlewares/auth.middleware`)

const router = express.Router()

// Get user by id -- GET 
router.get(`/:id`, authMiddleware, async (request, response) => {
  try {
    const { id } = request.params
    const user = await userUseCase.getById(id)
    
    if(!user) {
      return response.status(404).json({message: `User not found`})
    }

    response.json({
      message: `User retrieved`,
      data: {
        users: user
      }
    })
  } catch (error) {
    response.status(error.status || 500)
    response.json({
      message: `Something went wrong`,
      error: error.message
    })
  }
})

// Create a new user -- POST 
router.post(`/`, async (request, response) => {
  try {
    const user = request.body
    const newUser = await userUseCase.createOne(user)

    response.status(201)
    response.json({
      message: `User created`,
      data: {
        user: newUser
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