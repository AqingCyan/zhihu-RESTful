const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const error = require('koa-json-error')
const parameter = require('koa-parameter')
const mongoose = require('mongoose')
const routing = require('./routes')
const { connectionStr } = require('../config')

const app = new Koa()

// Connect MongoDB Atlas
mongoose.connect(connectionStr, { useNewUrlParser: true }, () => console.log('MongoDB connect success'))
mongoose.connection.on('error', console.error)

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

/**
 * The middlewares used by Koa
 * koa-json-error：Error handling and response to JSON
 * koa-bodyparser：Parsing the Body
 * koa-parameter：Parameter calibration
 * Batch registration route
 */
app.use(error(errHandle))
app.use(bodyparser())
app.use(parameter(app))
routing(app)

app.listen(3000, () => { console.log('app is running on port 3000') })
