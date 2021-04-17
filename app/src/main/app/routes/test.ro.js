const router = require(`koa-router`)()


router
  .get('/', (ctx) => {
    ctx.body = 'Ok'
  })

module.exports = router