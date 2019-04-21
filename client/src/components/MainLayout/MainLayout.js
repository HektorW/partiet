import React from 'react'
import { Link } from 'react-router-dom'
import logoSrc from '../../res/logo.jpg'
import './main-layout.scss'

const MainLayout = ({ children }) => (
  <div className="main-layout">
    <header className="main-layout__header">
      <Link to="/">
        <img className="main-layout__header-logo" src={logoSrc} />
      </Link>

      <h1 className="main-layout__header-title">Partiet</h1>

      <Link className="main-layout__header-settings-link" to="/settings">
        Settings
      </Link>
    </header>
    <main className="main-layout__content">{children}</main>
  </div>
)

export default MainLayout
