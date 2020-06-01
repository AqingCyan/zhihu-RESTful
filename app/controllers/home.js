const path = require('path')

class HomeCtl {
  index(ctx) {
    ctx.body = '<h1>这是主页</h1>'
  }

  upload(ctx) {
    const file = ctx.request.files
    const basename = path.basename(file[''].path)
    ctx.body = {
      message: 'success',
      url: `${ctx.origin}/uploads/${basename}`
    }
  }
}

module.exports = new HomeCtl()
