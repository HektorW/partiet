const Router = require('koa-router')

const malmokorpenRoute = require('./malmokorpen')

const apiRouter = new Router()

apiRouter.use(
  '/api/malmokorpen',
  malmokorpenRoute.routes(),
  malmokorpenRoute.allowedMethods()
)

module.exports = apiRouter
