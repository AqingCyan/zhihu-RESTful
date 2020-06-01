/**
 * User authentication and authorization
 */
const jwt = require('jsonwebtoken')
const { secret } = require('../config')

const userAuthMiddleWare = async (ctx, next) => {
  const { authorization = '' } = ctx.request.header
  const token = authorization.replace('Bearer ', '')
  console.log(token)
  try {
    const user = jwt.verify(token, secret)
    ctx.state.user = user
  } catch (error) {
    ctx.throw(401, error.message)
  }
  await next()
}

module.exports = userAuthMiddleWare
