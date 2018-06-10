import React from 'react'
import compareTeamName from '../../../utils/compareTeamName'
import './tables-viewer.scss'

const TablesViewer = ({ teams, isFetching, fetchError }) => (
  <div className="tables-viewer">
    <h2>{this.leagueId}</h2>

    {isFetching && <div>Hämtar tabell..</div>}

    {fetchError && <div>Något gick fel, kunde inte hämta tabellen :(</div>}

    {teams && teams.length ? (
      <div className="tables-viewer__container">
        <table className="tables-viewer__table">
          <thead className="tables-viewer__table-head">
            <tr>
              <th>Position</th>
              <th>Team</th>
              <th>Played</th>
              <th>Points</th>
            </tr>
          </thead>

          <tbody className="tables-viewer__table-body">
            {teams.map(team => (
              <tr
                key={team.name}
                className={`tables-viewer__table-row ${
                  compareTeamName(team.name, 'Partiet')
                    ? 'tables-viewer__table-row--is-own'
                    : ''
                }`}
              >
                <td>{team.position}</td>
                <td>{team.name}</td>
                <td>{team.played}</td>
                <td>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : null}
  </div>
)

export default TablesViewer
