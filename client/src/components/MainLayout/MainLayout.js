import React from 'react'
import './main-layout.scss'

const MainLayout = ({ children }) => (
  <div className="main-layout">
    <header className="main-layout__header">
      <h1 className="main-layout__header-title">Partiet</h1>
    </header>
    <main className="main-layout__content">{children}</main>
  </div>
)

export default MainLayout
