import React, { PureComponent } from 'react'

export default class TablesViewer extends PureComponent {
  leagueId = 'Utomhusserien 2018'
  teamName = 'Partiet'

  componentWillMount() {
    this.props.fetchTeams(this.leagueId, this.teamName)
  }

  render() {
    const { teams } = this.props

    return (
      <div>
        <h2>{this.leagueId}</h2>

        <table>
          <thead>
            <th>Position</th>
            <th>Team</th>
            <th>Points</th>
          </thead>

          {teams.map(team => (
            <tr key={team.name}>
              <td>{team.position}</td>
              <td>
                {team.name === this.teamName ? <b>{team.name}</b> : team.name}
              </td>
              <td>{team.points}</td>
            </tr>
          ))}
        </table>
      </div>
    )
  }
}
