const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./config/dbConfig')
const userRoutes = require('./routes/userRoutes')
const { errorHandler } = require('./middlewares/errorMiddleware')

const app = express()

// cors 中间件，允许跨域资源共享 (CORS)
// 会修改响应头，添加 Access-Control-Allow-Origin 字段，使得前端可以跨域访问后端接口
app.use(cors())

// morgan 中间件格式化 HTTP 请求的日志
// 终端输出 :method :url :status :response-time ms - :remote-addr
app.use(morgan('dev'))

// 使用 Express.js 中间件来解析 JSON 格式的请求体
// 它会将请求体中的 JSON 数据解析为 JavaScript 对象，并将其作为 req.body 属性传递给后续的请求处理程序
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/users', userRoutes)

app.use(errorHandler)

// sequelize.sync() 是 Sequelize 库中的一个方法，用于同步数据库模式。
// 它会检查数据库中是否存在与模型定义相匹配的表，如果不存在则创建新表，如果存在则更新表结构。
// 该方法通常在应用程序启动时调用，以确保数据库与模型的同步。
// 可以通过传入配置对象来配置同步行为，例如设置是否删除现有表等。
sequelize.sync()

module.exports = app
