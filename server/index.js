const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const api = require('./api')
const client = require('./client')

const app = new Koa()

app.use(async (ctx, next) => {
  console.log(`request: "${ctx.path}"`)
  await next()
  console.log(`reponse: ${ctx.status}`)
})

app.use(bodyParser())

app.use(api.routes())
app.use(api.allowedMethods())
app.use(require('./middleware/check404'))

app.use(client.createClientServeRoute())

module.exports = app
