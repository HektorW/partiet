export default function compareTeamName(teamNameA, teamNameB) {
  if (typeof teamNameA !== 'string' || typeof teamNameB !== 'string') {
    return false
  }

  return (
    teamNameA.replace(/\s+/, '').toLowerCase() ===
    teamNameB.replace(/\s+/, '').toLowerCase()
  )
}
