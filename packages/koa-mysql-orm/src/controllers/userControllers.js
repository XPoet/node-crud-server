const userService = require('../services/userService')

exports.getAllUsers = async (ctx) => {
  try {
    const users = await userService.getAllUsers()
    ctx.status = 200
    ctx.body = users
  } catch (error) {
    ctx.status = 500
    ctx.body = { error: error.message }
  }
}

exports.getUserById = async (ctx) => {
  try {
    const user = await userService.getUserById(ctx.params.id)
    if (!user) {
      ctx.status = 404
      ctx.body = { error: 'User not found' }
      return
    }
    ctx.status = 200
    ctx.body = user
  } catch (error) {
    ctx.status = 500
    ctx.body = { error: error.message }
  }
}

exports.createUser = async (ctx) => {
  try {
    const newUser = await userService.createUser(ctx.request.body)
    ctx.status = 201
    ctx.body = newUser
  } catch (error) {
    ctx.status = 500
    ctx.body = { error: error.message }
  }
}

exports.updateUser = async (ctx) => {
  try {
    const updateUser = await userService.updateUser(ctx.params.id, ctx.request.body)
    if (!updateUser) {
      ctx.status = 404
      ctx.body = { error: 'User not found' }
      return
    }
    ctx.status = 200
    ctx.body = updateUser
  } catch (error) {
    ctx.status = 500
    ctx.body = { error: error.message }
  }
}

exports.deleteUser = async (ctx) => {
  try {
    const deletedUser = await userService.deleteUser(ctx.params.id)
    if (!deletedUser) {
      ctx.status = 404
      ctx.body = { error: 'User not found' }
      return
    }
    ctx.status = 200
    ctx.body = { message: 'User deleted' }
  } catch (error) {
    ctx.status = 500
    ctx.body = { error: error.message }
  }
}
