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