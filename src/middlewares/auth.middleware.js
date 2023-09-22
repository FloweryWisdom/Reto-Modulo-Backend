const jwt = require(`../lib/jwt`)
const createError = require(`http-errors`)

function auth(request, response, next) {
  try {
    const { authorization } = request.headers

    if (!authorization) {
      throw new createError(401, `Token is required`)
    }
    const token = authorization.replace("Bearer ", "")
    const payload = jwt.verify(token)
    if (!payload) {
      throw new createError(401, `Could not verify token`)
    }

    request.user = payload

    next()
  } catch (error) {
    response.status(401)
    response.json({
      message: `Unauthorized`,
      error: error.message
    })
  }
}

module.exports = auth