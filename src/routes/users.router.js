const express = require(`express`)
const usersUseCase = require(`../usecases/users.usecase`)
const authMiddleware = require(`../middlewares/auth.middleware`)

const router = express.Router()

//List all users -- GET 
router.get(`/`, authMiddleware, async (request, response) => {
  try {
    const allUsers = await usersUseCase.getAll()

    response.json({
      message: `All users`,
      data: {
        users: allUsers
      }
    })
  } catch (error) {
    response.status(500)
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
    const newUser = await usersUseCase.createOne(user)

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