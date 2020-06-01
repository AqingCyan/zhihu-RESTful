/**
 * The user authorization
 */

const checkOwner = async (ctx, next) => {
  if (ctx.params.id !== ctx.state.user._id) {
    ctx.throw(403, 'The user does not have this permission')
  }
  await next()
}

module.exports = checkOwner
