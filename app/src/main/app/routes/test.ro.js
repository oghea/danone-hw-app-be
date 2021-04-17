const router = require(`koa-router`)()


router
  .get('/', parseAuth, () => {
    ctx.body = 'Ok'
  })

module.exports = router