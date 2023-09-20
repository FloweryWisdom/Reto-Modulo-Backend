const userModel = require(`../models/user.model`)
const mongoose = require(`mongoose`)
const createError = require(`http-errors`)
const bcrypt = require(`../lib/bcrypt`)

// GET /user/:id
async function getById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, `Invalid user id`)
  }
  
  const user = await userModel.findById(id)
  
  if (!user) {
    throw new createError(404, `User not found`)
  }

  return user
}
  
// POST /user
async function createOne(user) {
  //validate if user exists
  const userExists = await userModel.findOne({ email: user.email })
  
  if (userExists) {
    throw new createError(412, `Email already registered`)
  }

  const passwordRegex = new RegExp(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-.+]).{8,}$`)

  if (!passwordRegex.test(user.password)) {
    throw new createError(400, `Password must have at least 8 characters, one uppercase letter, one lowercasde letter, one number and one special character`)
  }

  //save encrypted password
  user.password = bcrypt.encrypt(user.password)

  return newUser = await userModel.create(user)
}



















module.exports = {
  getById,
  createOne,
}