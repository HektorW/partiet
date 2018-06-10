const firstTeamTableIndex = 3

module.exports = function parseLeagueTable($) {
  const $tables = $('#pData table').slice(firstTeamTableIndex)
  const lastTeamIndex = findFirstNoneTeamIndex($, $tables) - 1
  const $teams = $tables.slice(0, lastTeamIndex)

  return $teams
    .map((index, teamTableEl) => parseTeamStats($(teamTableEl)))
    .toArray()
}

const findFirstNoneTeamIndex = ($, $tables) =>
  $tables.toArray().findIndex(tableEl => {
    const leaguePositionStr = $(tableEl)
      .find('td')
      .first()
      .text()
    const leaguePosition = parseInt(leaguePositionStr, 10)
    const isTeam =
      typeof leaguePosition === 'number' &&
      Number.isNaN(leaguePosition) === false
    return isTeam === false
  })

const parseTeamStats = $teamTable => {
  const $tds = $teamTable.find('td')
  const [scoredGoals, concededGoals] = $tds
    .eq(6)
    .text()
    .split(' - ')

  return {
    position: parseInt($tds.eq(0).text(), 10),
    name: $tds.eq(1).text(),
    played: parseInt($tds.eq(2).text(), 10),
    won: parseInt($tds.eq(3).text(), 10),
    draw: parseInt($tds.eq(4).text(), 10),
    lost: parseInt($tds.eq(5).text(), 10),
    scored: parseInt(scoredGoals, 10),
    conceded: parseInt(concededGoals, 10),
    points: parseInt($tds.eq(7).text(), 10)
  }
}
