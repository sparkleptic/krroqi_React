/* eslint-disable global-require */
/* eslint-disable no-undef */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

let middleware = [thunk];
let middlewareApply;

if (__DEV__) {
  const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Prevents Redux DevTools from re-dispatching all previous actions.
      shouldHotReload: false,
    })
    : compose;
  middleware = [...middleware, reduxImmutableStateInvariant, logger];
  middlewareApply = composeEnhancers(applyMiddleware(...middleware));
} else {
  middleware = [...middleware];
  middlewareApply = applyMiddleware(...middleware);
}

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, middlewareApply);
}
