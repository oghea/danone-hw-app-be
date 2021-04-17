const jwt = require('jsonwebtoken')

const userService = require('services/user.js')

exports.parseAuth = async (ctx, next) => {
  const {
    authorization
  } = ctx.header
  try {
    const decoded = jwt.verify(authorization, process.env[`JWT_SECRET_KEY`]);

    ctx.user = {
      ...decoded
    }
  } catch (err) {
    ctx.throw(401, 'Unauthorized')
  }
  await next()
}

exports.isAdmin = async (ctx, next) => {
  const user = await userService.getOne(ctx.user.id);

  if (user.role != 0) throw ({
    message: 'Forbiden',
    status: 403
  })

  await next()
}