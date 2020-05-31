const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const routing = require('./routes')

const app = new Koa()

/**
 * Error handling with koa-json-error:
 * But no stack call information is returned in production
 * Detail in README
 */
const errHandle = {
  postFormat: (err, { stack, ...rest }) => (
    process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
  )
}

app.use(error(errHandle))
app.use(bodyparser())
app.use(parameter(app)) // Parameter calibration
routing(app) // Batch registration route

app.listen(3000, () => { console.log('app is running on port 3000') })
