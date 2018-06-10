import compareTeamName from '../../utils/compareTeamName'

export const getOppositionName = match =>
  compareTeamName(match.teamA, 'Partiet') ? match.teamB : match.teamA
