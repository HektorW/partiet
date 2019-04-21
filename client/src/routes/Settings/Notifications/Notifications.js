import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../../../components/_inputs/Checkbox'
import useUILoadState from '../../../hooks/useUILoadState'
import './notifications.scss'

const Notifications = ({
  isPushSupported,
  isSubscribed,
  isLoading,
  notSupportedReasons,
  setSubscribed
}) => {
  const shouldShowLoadState = useUILoadState(isLoading, 100, 1250)

  return (
    <section className="notifications">
      {isPushSupported ? (
        <Fragment>
          <Checkbox
            className="notifications__checkbox"
            isChecked={isSubscribed}
            onChange={setSubscribed}
            disabled={shouldShowLoadState}
          >
            Skicka notis om match resultat
          </Checkbox>

          {shouldShowLoadState && (
            <small className="notifications__loading">
              Vänta lite, tar hand om några kopplingar bakom kulisserna
            </small>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <p>Din webbläsare stödjer inte push notiser :(</p>
          <ul>
            {notSupportedReasons.map(reason => <li key={reason}>{reason}</li>)}
          </ul>
        </Fragment>
      )}
    </section>
  )
}

Notifications.propTypes = {}

export default Notifications
