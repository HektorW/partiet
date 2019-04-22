import React from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation'
// import logoSrc from '../../res/logo.jpg'
import './main-layout.scss'

const MainLayout = ({ children }) => (
  <div className="main-layout">
    <header className="main-layout__header">
      <Link to="/">
        <img
          className="main-layout__header-logo"
          src="/images/logo_white.png"
        />
      </Link>

      <h1 className="main-layout__header-title">Partiet</h1>
    </header>
    <main className="main-layout__content">{children}</main>

    <Navigation />
  </div>
)

export default MainLayout
