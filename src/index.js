const injectTouchTapEvent = require('react-tap-event-plugin');
injectTouchTapEvent();

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';

// Render the main component into the dom
ReactDOM.render(<App />, document.getElementById('app'));
