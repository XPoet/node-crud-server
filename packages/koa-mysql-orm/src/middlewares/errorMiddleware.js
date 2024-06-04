exports.errorHandler = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    console.error(error.stack)
    ctx.status = 500
    ctx.body = { error: 'Something went wrong!' }
  }
}
