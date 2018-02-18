function redirectToDevServer(ctx) {
  ctx.response.redirect('http://localhost:3000')
}

module.exports.createRoute = function createRoute() {
  return redirectToDevServer
}
