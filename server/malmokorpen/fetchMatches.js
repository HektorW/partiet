const getJson = require('./getJson')

module.exports = async function fetchMatches(leagueId) {
  const requestPath = `teamsport/match/get?division_id=${leagueId}`
  const matches = await getJson(requestPath)
  return matches
}
