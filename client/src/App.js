import './public/index.css'
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Topnav from './components/Topnav'

export default class App extends Component {
  render() {
    return (
      <Router>
        <Topnav />
        <Switch>
          {/* <Route exact path='/' component={Home} /> */}
          {/* <Route path='/project' component={ProjectScreen} /> */}
        </Switch>
      </Router>
    );
  }
}
