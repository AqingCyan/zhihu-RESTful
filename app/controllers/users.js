const User = require('../models/user')
const { handleUserResponse } = require('../../utils/responseBody')

class UsersCtl {
  async find(ctx) {
    const users = await User.find()
    ctx.body = { message: 'success', users }
  }

  async findById(ctx) {
    const user = await User.findById(ctx.params.id)
    if (!user) {
      ctx.throw(404, 'The user doesn\'t exist')
    }
    ctx.body = handleUserResponse('success', user)
  }

  async create(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
    })
    const { name } = ctx.request.body
    const repeatUser = await User.findOne({ name })
    if (repeatUser) {
      ctx.throw(409, 'The user already exists')
    }
    const user = await new User(ctx.request.body).save()
    ctx.body = handleUserResponse('success', user)
  }

  async update(ctx) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      password: { type: 'string', required: false },
    })
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body)
    if (!user) {
      ctx.throw(404, 'The user doesn\'t exist，and can\'t upadte')
    }
    const res = ctx.request.body.name ? { _id: user._id, name: ctx.request.body.name } : user
    ctx.body = { message: 'success', ...res }
  }

  async delete(ctx) {
    const user = await User.findByIdAndRemove(ctx.params.id)
    if (!user) {
      ctx.throw(404, 'The user doesn\'t exist，and can\'t delete')
    }
    ctx.status = 204
    ctx.body = { message: 'success' }
  }
}

module.exports = new UsersCtl()
