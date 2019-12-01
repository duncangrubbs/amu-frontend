import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Profile from './Profile';
import Signup from './Signup';

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/profile" component={Profile} />
  </Switch>
);
