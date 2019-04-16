import React, { Component } from 'react'
import { connect } from 'react-redux'
import Router from './components/Router'
import { fetchMatches } from './modules/matches/matches.actions'
import { initializePush } from './modules/notifications/notifications.actions'
import { fetchLeagueTable } from './modules/tables/tables.actions'

class PartietApp extends Component {
  componentWillMount() {
    const leagueId = '12'
    const teamName = 'Partiet'
    this.props.fetchLeagueTable(leagueId, teamName)
    // this.props.fetchTeams(leagueId, teamName)
    this.props.initializePush()
  }

  render() {
    return <Router />
  }
}

const mapDispatchToProps = {
  fetchMatches,
  fetchLeagueTable,
  initializePush
}

export default connect(
  null,
  mapDispatchToProps
)(PartietApp)
