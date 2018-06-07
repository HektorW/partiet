const { join } = require('path')
const serve = require('koa-static')

const shouldRedirectToDevServer = process.env.NODE_ENV === 'development'

function redirectToDevServer(ctx) {
  ctx.body = `
    <p>Client is not served in DEVELOPMENT mode</p>
    <p>Try <a href="http://localhost:4000">http://localhost:4000</a></p>
  `
}

const serveClient = serve(join(__dirname, '../../client/dist'))

module.exports.createClientServeRoute = function createClientServeRoute() {
  if (shouldRedirectToDevServer) {
    console.log('create client')
    return redirectToDevServer
  } else {
    return serveClient
  }
}
