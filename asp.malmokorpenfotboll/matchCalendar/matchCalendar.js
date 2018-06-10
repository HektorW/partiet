const fetchPageDOM = require('../fetchPageDOM')
const matchCalendarParse = require('./matchCalendar.parse')

const tableUrl = 'http://asp.malmokorpenfotboll.com/MatchKalender.aspx'
const queryKey = 'cup'
const optionListId = 'cmbLag'
const submitButtonId = 'buttonValjLag'

module.exports = async function matchCalendar(leagueId, teamName) {
  const $pageDOM = await fetchPageDOM(
    tableUrl,
    `${queryKey}=${leagueId}`,
    optionListId,
    teamName,
    submitButtonId
  )

  return matchCalendarParse($pageDOM)
}
