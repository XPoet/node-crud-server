require('dotenv').config() // 确保在加载其他模块之前加载 .env 文件

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET
}
