const Router = require('koa-router')

const malmokorpenRoutes = new Router()

malmokorpenRoutes.get(
  '/leaguetable/:leagueId/:teamName',
  require('./leagueTable')
)
malmokorpenRoutes.get(
  '/matchcalendar/:leagueId/:teamName',
  require('./matchCalendar')
)

module.exports = malmokorpenRoutes
