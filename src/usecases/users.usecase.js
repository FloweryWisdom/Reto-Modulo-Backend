const userModel = require(`../models/users.model`)
const mongoose = require(`mongoose`)
const createError = require(`http-errors`)
const bcrypt = require(`../lib/bcrypt`)

// GET /users
async function getAll() {
  const allUsers = await userModel.find()
  return allUsers
}

// POST /users
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
  getAll,
  createOne
}