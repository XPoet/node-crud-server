const { Sequelize } = require('sequelize')
require('dotenv').config() // 确保在加载其他模块之前加载 .env 文件

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql'
  }
)

const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('MySQL connected')
  } catch (error) {
    console.error('MySQL connection failed:', error.message)
    process.exit(1)
  }
}

const disconnectDB = async () => {
  try {
    await sequelize.close()
    console.log('MySQL disconnected')
  } catch (error) {
    console.error('Failed to disconnect MySQL:', error.message)
  }
}

connectDB()

module.exports = { sequelize, disconnectDB }
