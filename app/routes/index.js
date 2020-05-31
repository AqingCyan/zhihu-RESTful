const fs = require('fs')

/**
 * Batch registration routes
 * Read all routing files except index.js，app use all router
 */
module.exports = app => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') {
      return
    }
    const route = require(`./${file}`)
    app.use(route.routes()).use(route.allowedMethods())
  })
}