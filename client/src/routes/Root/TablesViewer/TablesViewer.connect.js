import { connect } from 'react-redux'
import TablesViewer from './TablesViewer'

const mapStateToProps = ({ tables }) => ({
  teams: tables.teams,
  isFetching: tables.isFetching,
  fetchError: tables.fetchError
})

export default connect(mapStateToProps)(TablesViewer)
