import React, { PureComponent } from 'react'

export default class TablesViewer extends PureComponent {
  leagueId = 'Utomhusserien 2018'
  teamName = 'Partiet'

  componentWillMount() {
    this.props.fetchTeams(this.leagueId, this.teamName)
  }

  render() {
    const { teams, isFetching, fetchError } = this.props

    return (
      <div>
        <h2>{this.leagueId}</h2>

        {isFetching && <div>Hämtar tabell..</div>}

        {fetchError && <div>Något gick fel, kunde inte hämta tabellen :(</div>}

        {teams && teams.length ? (
          <table>
            <thead>
              <tr>
                <th>Position</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>

            <tbody>
              {teams.map(team => (
                <tr key={team.name}>
                  <td>{team.position}</td>
                  <td>
                    {team.name === this.teamName ? (
                      <b>{team.name}</b>
                    ) : (
                      team.name
                    )}
                  </td>
                  <td>{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    )
  }
}
