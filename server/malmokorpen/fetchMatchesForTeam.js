const fetchMatches = require('./fetchMatches')

module.exports = async function fetchMatchesForTeam(leagueId, teamId) {
  const allMatches = await fetchMatches(leagueId)

  const teamMatches = allMatches.filter(match =>
    match.teams.some(team => team.id === teamId)
  )

  return teamMatches
}
