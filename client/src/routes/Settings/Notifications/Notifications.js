import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import UILoadState from '../../../components/_functional/UILoadState'
import Checkbox from '../../../components/_inputs/Checkbox'
import './notifications.scss'

const Notifications = ({
  isPushSupported,
  isSubscribed,
  isLoading,
  notSupportedReasons,
  setSubscribed
}) => (
  <section className="notifications">
    {isPushSupported ? (
      <UILoadState isLoading={isLoading}>
        {shouldShowLoadState => (
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
        )}
      </UILoadState>
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

Notifications.propTypes = {}

export default Notifications
