const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const error = require('koa-json-error')
const routing = require('./routes')

const app = new Koa()

/**
 * Error handling with koa-json-error:
 * {
 *   "stack": "NotFoundError: Not Found\n at Object.throw xxxxxxx",
 *   "message": "Not Found",
 *   "name": "NotFoundError",
 *   "status": 404
 * }
 * but no stack call information is returned in production
 * {
 *   "message": "Not Found",
 *   "name": "NotFoundError",
 *   "status": 404
 * }
 */
app.use(error({
  postFormat: (err, { stack, ...rest }) => (
    process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
  )
}))

app.use(bodyparser())

// Batch registration route
routing(app)

app.listen(3000, () => { console.log('app is running on port 3000') })
