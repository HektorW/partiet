import React from 'react'
import compareTeamName from '../../../utils/compareTeamName'
import './tables-viewer.scss'

const TablesViewer = ({ tableRows, isFetching, fetchError }) => (
  <div className="tables-viewer">
    {isFetching && <div>Hämtar tabell..</div>}

    {fetchError && <div>Något gick fel, kunde inte hämta tabellen :(</div>}

    {tableRows && tableRows.length ? (
      <div className="tables-viewer__container">
        <table className="tables-viewer__table">
          <thead className="tables-viewer__table-head">
            <tr>
              <th>Position</th>
              <th>Team</th>
              <th>Played</th>

              <th>W</th>
              <th>D</th>
              <th>L</th>
              <th>S</th>
              <th>C</th>
              <th>Points</th>
            </tr>
          </thead>

          <tbody className="tables-viewer__table-body">
            {tableRows.map(team => (
              <tr
                key={team.name}
                className={`tables-viewer__table-row ${
                  compareTeamName(team.name, 'Partiet')
                    ? 'tables-viewer__table-row--is-own'
                    : ''
                }`}
              >
                <td className="tables-viewer__table-data--position">
                  {team.position}
                </td>
                <td className="tables-viewer__table-data--name">
                  <img
                    className="tables-viewer__table-data-image"
                    src={`https://korpenmalmoidrottsforening.zoezi.se/api/public/image/get?size=30x30&type=usergroup&id=${
                      team.imageId
                    }`}
                    alt={team.name}
                  />
                  {team.name}
                </td>
                <td className="tables-viewer__table-data--played">
                  {team.played}
                </td>

                <td className="tables-viewer__table-data--won">{team.won}</td>
                <td className="tables-viewer__table-data--draw">{team.draw}</td>
                <td className="tables-viewer__table-data--lost">{team.lost}</td>
                <td className="tables-viewer__table-data--scored">
                  {team.scored}
                </td>
                <td className="tables-viewer__table-data--conceded">
                  {team.conceded}
                </td>

                <td className="tables-viewer__table-data--points">
                  {team.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : null}
  </div>
)

export default TablesViewer
