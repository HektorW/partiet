import { connect } from 'react-redux'
import NextMatch from './NextMatch'
import { getNextMatch } from '../../../modules/matches/matches.selectors'
import { getTeamLeagueStats } from '../../../modules/tables/tables.utils'
import { getOppositionName } from '../../../modules/matches/matches.utils'

const mapStateToProps = state => {
  const match = getNextMatch(state)

  if (!match) {
    return { match: null }
  }

  const oppositionName = getOppositionName(match)
  const opposition = getTeamLeagueStats(state.tables.teams, oppositionName)

  return {
    match,
    opposition: opposition ? opposition : { name: oppositionName }
  }
}

export default connect(mapStateToProps)(NextMatch)
