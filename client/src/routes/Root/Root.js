import React from 'react'
import PropTypes from 'prop-types'
import TablesViewer from './TablesViewer/TablesViewer.connect'
import './root.scss'

const Root = () => (
  <div className="root">
    <h1 className="root__title">Partiet</h1>

    <TablesViewer />
  </div>
)

Root.propTypes = {}

export default Root
