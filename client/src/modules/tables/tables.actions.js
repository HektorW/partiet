import { get } from '../../api'

export const FETCHING_TABLE_REQUEST = 'TABLES_FETCHING_TABLE_REQUEST'
export const FETCHING_TABLE_SUCCESS = 'TABLES_FETCHING_TABLE_SUCCESS'
export const FETCHING_TABLE_FAILURE = 'TABLES_FETCHING_TABLE_FAILURE'
export const TEAMS_UPDATED = 'TABLES_TEAMS_UPDATED'

export const fetchTeams = (leagueId, teamName) => async dispatch => {
  dispatch({ type: FETCHING_TABLE_REQUEST })

  let teams
  try {
    teams = await get(`/api/malmokorpen/leaguetable/${leagueId}/${teamName}`)
  } catch (error) {
    dispatch({ type: FETCHING_TABLE_FAILURE, error })
    return
  }

  dispatch({ type: FETCHING_TABLE_SUCCESS, teams })
}