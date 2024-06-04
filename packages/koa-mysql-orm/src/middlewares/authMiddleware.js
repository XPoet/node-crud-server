const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/serverConfig')

exports.authenticate = async (ctx, next) => {
  const token = ctx.header.authorization
  if (!token) {
    ctx.status = 401
    ctx.body = { error: 'Access denied. No token provided.' }
    return
  }

  try {
    const decoded = jwt.verify(token, jwtSecret)
    ctx.state.user = decoded
    await next()
  } catch (error) {
    ctx.status = 400
    ctx.body = { error: `Invalid token. ${error}` }
  }
}
