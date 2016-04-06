const injectTouchTapEvent = require('react-tap-event-plugin');
injectTouchTapEvent();

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import LandingView from './components/LandingView/LandingView';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';


// Render the main component into the dom
ReactDOM.render(
  <Router history={browserHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={LandingView}/>
  </Route>
</Router>,
document.getElementById('app'));
