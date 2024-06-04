const app = require('./app')
const { port } = require('./config/serverConfig')
const { disconnectDB } = require('./config/dbConfig')

const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

const gracefulShutdown = async () => {
  console.log('Shutting down gracefully...')
  await disconnectDB()
  server.close(() => {
    console.log('Server closed')
    process.exit(0)
  })
}

process.on('SIGTERM', gracefulShutdown)
process.on('SIGINT', gracefulShutdown)
