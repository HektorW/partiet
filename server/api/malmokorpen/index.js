const Router = require('koa-router')

const malmokorpenRoutes = new Router()

malmokorpenRoutes.get(
  '/leaguetable/:leagueId/:teamName',
  require('./leagueTable')
)

module.exports = malmokorpenRoutes
