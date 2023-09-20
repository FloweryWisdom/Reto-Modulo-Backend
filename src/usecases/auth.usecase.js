const userModel = require(`../models/user.model`)
const createError = require(`http-errors`)
const jwt = require(`..lib/jwt`)
const bcrypt = require(`bcryptjs`)

async function login(email, password) {
  const user = await userModel.findOne({ email})

  if (!user) {
    throw new createError(401, `Email or password incorrect`)
  }

  const isValidPassword = bcrypt.verify(user.password, password)

  if (!isValidPassword) {
    throw new createError(401, `Email or password incorrect`)
  }

  //Generate token
  const token = jwt.sign({ id: user._id})
  return token
}

module.exports = login 