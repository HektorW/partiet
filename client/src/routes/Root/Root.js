import React from 'react'
import PropTypes from 'prop-types'
import TablesViewer from './TablesViewer/TablesViewer.connect'
import './root.scss'
import MainLayout from '../../components/MainLayout'

const Root = () => (
  <MainLayout>
    <TablesViewer />
  </MainLayout>
)

Root.propTypes = {}

export default Root
