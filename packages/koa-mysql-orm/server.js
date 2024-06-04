const app = require('./src/app')
const { port } = require('./src/config/serverConfig')
const { disconnectDB } = require('./src/config/dbConfig')

const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

const gracefulShutdown = async () => {
  console.log('\r\nShutting down gracefully...')
  await disconnectDB()
  server.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)
