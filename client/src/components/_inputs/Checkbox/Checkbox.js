import React from 'react'
import PropTypes from 'prop-types'
import { classNames } from '../../../utils/classNames'

const Checkbox = ({ isChecked, className, children, onChange }) => (
  <label className={classNames('checkbox', className)}>
    <input
      className="checkbox__box"
      type="checkbox"
      checked={isChecked}
      onChange={event => onChange(event.target.checked)}
    />
    <span className="checkbox__children">{children}</span>
  </label>
)

Checkbox.propTypes = {}

export default Checkbox
