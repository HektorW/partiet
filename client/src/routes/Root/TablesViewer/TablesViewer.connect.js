import { connect } from 'react-redux'
import TablesViewer from './TablesViewer'
import { fetchTeams } from '../../../modules/tables/tables.actions'

const mapStateToProps = ({ tables }) => ({
  teams: tables.teams,
  isFetching: tables.isFetching,
  fetchError: tables.fetchError
})

const mapDispatchToProps = {
  fetchTeams
}

export default connect(mapStateToProps, mapDispatchToProps)(TablesViewer)
