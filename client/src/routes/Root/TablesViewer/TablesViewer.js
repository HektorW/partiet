import React from 'react'

const TablesViewer = ({ teams, fetchTeams }) => (
  <div>
    <h2>Teams</h2>
    <button onClick={fetchTeams}>
      Fetch teams!
    </button>

    <ul>
      {teams.map(team => (
        <li key={team.name}>
          {team.position}. {team.name} - {team.points}
        </li>
      ))}
    </ul>
  </div>
)

export default TablesViewer
