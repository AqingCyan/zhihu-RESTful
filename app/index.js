const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const routing = require('./routes')

const app = new Koa()

app.use(bodyparser())
// Batch registration route
routing(app)

app.listen(3000, () => { console.log('app is running on port 3000') })
