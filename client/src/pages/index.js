import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './login/index';
import Detail from './detail/index.js';
import './index.scss'
 
export default class Instagram extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Detail}/>
          <Route path="/login" component={Login}/>
        </Switch>
      </Router>
    )
  }
};
