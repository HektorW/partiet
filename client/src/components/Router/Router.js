import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import NotFound404 from '../../routes/NotFound404'
import Root from '../../routes/Root'

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Root} />

      <Route component={NotFound404} />
    </Switch>
  </BrowserRouter>
)

export default Router
