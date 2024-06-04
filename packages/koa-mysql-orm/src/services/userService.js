const User = require('../models/userModel')

exports.getAllUsers = async () => {
  return await User.findAll()
}

exports.getUserById = async (id) => {
  return await User.findByPk(id)
}

exports.createUser = async (userData) => {
  return await User.create(userData)
}

exports.updateUser = async (id, userData) => {
  const user = await User.findByPk(id)
  if (!user) {
    return null
  }
  return await user.update(userData)
}

exports.deleteUser = async (id) => {
  const user = await User.findByPk(id)
  if (!user) {
    return null
  }
  await user.destroy()
  return user
}
