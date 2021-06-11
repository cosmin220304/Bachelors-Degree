import './public/index.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Topnav from './components/Topnav'
import Home from './screens/Home'
import Project from './screens/Project'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Topnav />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/project' component={Project} />
        </Switch>
      </Router>
    );
  }
}
