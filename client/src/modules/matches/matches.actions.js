import { get } from '../../api'

export const FETCHING_MATCHES_REQUEST = 'TABLES_FETCHING_MATCHES_REQUEST'
export const FETCHING_MATCHES_SUCCESS = 'TABLES_FETCHING_MATCHES_SUCCESS'
export const FETCHING_MATCHES_FAILURE = 'TABLES_FETCHING_MATCHES_FAILURE'

export const fetchMatches = (leagueId, teamName) => async dispatch => {
  dispatch({ type: FETCHING_MATCHES_REQUEST })

  let matches
  try {
    matches = await get(
      `/api/malmokorpen/matchcalendar/${leagueId}/${teamName}`
    )
  } catch (error) {
    dispatch({ type: FETCHING_MATCHES_FAILURE, error })
    return
  }

  dispatch({ type: FETCHING_MATCHES_SUCCESS, matches })
}
