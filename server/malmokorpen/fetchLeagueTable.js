const getJson = require('./getJson')

module.exports = async function fetchLeagueTable(leagueId) {
  const requestPath = `memberapi/teamsport/result/for_division?division_id=${leagueId}`
  const { rows } = await getJson(requestPath)

  return rows.map(teamRow => ({
    position: teamRow[0],
    teamId: teamRow[1][0],
    name: teamRow[1][1],
    played: teamRow[2],
    won: teamRow[3],
    draw: teamRow[4],
    lost: teamRow[5],
    scored: teamRow[6],
    conceded: teamRow[7],
    goalDifference: teamRow[8],
    points: teamRow[9]
  }))
}
