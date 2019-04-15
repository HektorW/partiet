import { connect } from 'react-redux'
import Notifications from './Notifications'
import {
  subscribeToPush,
  unsubscribeFromPush
} from '../../../modules/notifications/notifications.actions'
import {
  isPushSupported,
  isSubscribed
} from '../../../modules/notifications/notifications.selectors'

const mapStateToProps = state => ({
  isPushSupported: isPushSupported(state),
  isSubscribed: isSubscribed(state)
})

const mapDispatchToProps = {
  subscribeToPush,
  unsubscribeFromPush
}

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  ...dispatchProps,

  setSubscribed: shouldSubscribe => {
    if (shouldSubscribe) {
      dispatchProps.subscribeToPush()
    } else {
      dispatchProps.unsubscribeFromPush()
    }
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Notifications)
