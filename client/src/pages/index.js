import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './login/index';
import Nav from '@components/nav/index.js';

export default class Instagram extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" />
          <Route path="/login" component={Login}/>
        </Switch>
      </Router>
    )
  }
};
