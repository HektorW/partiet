const fetchPageDOM = require('../fetchPageDOM')
const leagueTableParse = require('./leagueTable.parse')

const tableUrl = 'http://asp.malmokorpenfotboll.com/matchtabell.aspx'
const queryKey = 'cup'
const optionListId = 'cmbLag'
const submitButtonId = 'buttonValjLag'

module.exports = async function leagueTable(leagueId, teamName) {
  const $pageDOM = await fetchPageDOM(
    tableUrl,
    `${queryKey}=${leagueId}`,
    optionListId,
    teamName,
    submitButtonId
  )

  return leagueTableParse($pageDOM)
}
