const injectTouchTapEvent = require('react-tap-event-plugin');
injectTouchTapEvent();

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from 'components/Main';
import LandingView from 'components/LandingView';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { getUserAuth } from './actions/AccountActions';


import configureStore from './stores/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();
store.dispatch(getUserAuth());

// Render the main component into the dom
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={LandingView}/>
      </Route>
    </Router>
  </Provider>,
document.getElementById('app'));
