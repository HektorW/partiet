import React from 'react'
import PropTypes from 'prop-types'
import Checkbox from '../../../components/_inputs/Checkbox'

const Notifications = ({ isPushSupported, isSubscribed, setSubscribed }) => (
  <section>
    {isPushSupported ? (
      <Checkbox isChecked={isSubscribed} onChange={setSubscribed}>
        Skicka notis om match resultat
      </Checkbox>
    ) : (
      <p>Din webbläsare stödjer inte push notiser :(</p>
    )}
  </section>
)

Notifications.propTypes = {}

export default Notifications
