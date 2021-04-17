const router = require(`koa-router`)()


router
  .get('/', () => {
    ctx.body = 'Ok'
  })

module.exports = router