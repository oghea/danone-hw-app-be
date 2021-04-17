const emitter = require(`lib/emitter`)
const config = require(`config`)

module.exports = handle

function handle () {
  return async function (ctx, next) {
    try {
      await next()
    } catch (error) {
      console.log(error)
      // Emit to sentry for logging error
      // emitter.emit('sentry:error', { ctx: ctx, error: error} )
      
      if(error.response) {
        ctx.status = error.response.status || 500;
        ctx.body = error.response.data;
      } else {
        ctx.status = error.status || 500;
        ctx.body = error.message;
      }
    }
  }
}