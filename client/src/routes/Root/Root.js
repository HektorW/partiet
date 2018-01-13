import React from 'react'
import PropTypes from 'prop-types'
import './root.scss'

const Root = ({ currentCount, increaseCount, decreaseCount }) => (
  <div className="root">
    <h1 className="root__title">Partiet</h1>

    <div className="root__counter">
      <button className="root__counter-decrease" onClick={decreaseCount}>
        -
      </button>

      <div className="root__counter-value">{currentCount}</div>

      <button className="root__counter-increase" onClick={increaseCount}>
        +
      </button>
    </div>
  </div>
)

Root.propTypes = {
  currentCount: PropTypes.number.isRequired,

  increaseCount: PropTypes.func.isRequired,
  decreaseCount: PropTypes.func.isRequired
}

export default Root
