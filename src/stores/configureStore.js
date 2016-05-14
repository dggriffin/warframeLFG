import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

export default function configureStore() {
  const store = createStore(rootReducer, compose(applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f))

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store;
}
