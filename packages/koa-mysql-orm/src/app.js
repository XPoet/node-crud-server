const Koa = require('koa')
const { sequelize } = require('../src/config/dbConfig')
const cors = require('@koa/cors')
const morgan = require('koa-morgan')
const bodyParser = require('koa-bodyparser')
const { errorHandler } = require('../src/middlewares/errorMiddleware')
const userRoutes = require('../src/routes/userRoutes')

const app = new Koa()

app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser())
app.use(errorHandler)

const router = require('koa-router')()
router.get('/', (ctx) => {
  ctx.body = 'Hello Koa'
})
router.use('/api/users', userRoutes.routes())
app.use(router.routes()).use(router.allowedMethods())

sequelize.sync()

module.exports = app
