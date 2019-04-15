import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from './components/Router'
import { fetchMatches } from './modules/matches/matches.actions'
import { initializePush } from './modules/notifications/notifications.actions'
import { fetchTeams } from './modules/tables/tables.actions'

class PartietApp extends Component {
  componentWillMount() {
    const leagueId = 'Utomhusserien 2018'
    const teamName = 'Partiet'
    // this.props.fetchMatches(leagueId, teamName)
    // this.props.fetchTeams(leagueId, teamName)
    this.props.initializePush()
  }

  render() {
    return <Router />
  }
}

const mapDispatchToProps = {
  fetchMatches,
  fetchTeams,
  initializePush
}

export default connect(
  null,
  mapDispatchToProps
)(PartietApp)
