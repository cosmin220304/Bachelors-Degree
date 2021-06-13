import './public/index.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import Topnav from './components/Topnav'
import Auth from './screens/Auth'
import Home from './screens/Home'
import Project from './screens/Project'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Topnav />
        <Switch>
          <Route path='/auth' component={Auth} />
          <PrivateRoute exact path='/' component={Home} />
          <PrivateRoute path='/project/:id' component={Project} />
        </Switch>
      </Router>
    );
  }
}
