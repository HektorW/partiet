import { createSelector } from 'reselect'

const matchesState = state => state.matches

export const getMatches = createSelector(
  matchesState,
  _matchesState => _matchesState.matches
)

export const getNextMatch = createSelector(getMatches, matches => {
  const now = Date.now()
  return matches.find(match => match.date > now)
})
