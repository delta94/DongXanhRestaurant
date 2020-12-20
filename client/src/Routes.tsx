import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Menu from './pages/Menu'
import Contact from './pages/Contact'
import Admin from './pages/Admin'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/menu" component={Menu} />
    <Route exact path="/contact" component={Contact} />
    <Route exact path="/admin" component={Admin} />
  </Switch>
)

export default Routes
