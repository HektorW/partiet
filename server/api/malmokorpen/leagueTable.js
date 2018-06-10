const leagueTable = require('../../../asp.malmokorpenfotboll/leagueTable')

module.exports = async function leagueTableHandler(ctx) {
  const { leagueId, teamName } = ctx.params

  ctx.body = await leagueTable(leagueId, teamName)
}
