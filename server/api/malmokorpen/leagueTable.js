const fetchTable = require('../../../scrape/fetchTable')

const tableUrl = 'http://asp.malmokorpenfotboll.com/matchtabell.aspx'
const queryKey = 'cup'

module.exports = async function(ctx) {
  const { leagueId, teamName } = ctx.params

  ctx.body = await fetchTable(tableUrl, queryKey, leagueId, teamName)
}
