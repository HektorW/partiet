import { connect } from 'react-redux'
import Root from './Root'
import { increaseCount, decreaseCount } from '../../modules/foo/foo.actions'

const mapStateToProps = ({ foo }) => ({
  currentCount: foo.count
})

const mapDispatchToProps = {
  increaseCount,
  decreaseCount
}

export default connect(mapStateToProps, mapDispatchToProps)(Root)
