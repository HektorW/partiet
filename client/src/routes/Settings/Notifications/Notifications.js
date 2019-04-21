import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../../../components/_inputs/Checkbox'

const Notifications = ({
  isPushSupported,
  isSubscribed,
  notSupportedReasons,
  setSubscribed
}) => (
  <section>
    {isPushSupported ? (
      <Checkbox isChecked={isSubscribed} onChange={setSubscribed}>
        Skicka notis om match resultat
      </Checkbox>
    ) : (
      <Fragment>
        <p>Din webbläsare stödjer inte push notiser :(</p>
        <ul>
          {notSupportedReasons.map(reason => <li key={reason}>{reason}</li>)}
        </ul>
      </Fragment>
    )}

    <p>
      <small>UA: {navigator.userAgent}</small>
    </p>
  </section>
)

Notifications.propTypes = {}

export default Notifications
