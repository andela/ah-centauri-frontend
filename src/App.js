import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';

import reducers from './reducers';
import setAuthToken from './utils/setAuthToken';


// eslint-disable-next-line valid-typeof,no-underscore-dangle
const composeEnhancers = typeof window === 'objects' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  // eslint-disable-next-line no-underscore-dangle
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const token = localStorage.getItem('AUTH_TOKEN');

const store = createStore(
  reducers,
  {
    auth: { authenticated: token },
  },
  composeEnhancers(applyMiddleware(reduxThunk)),
);

if (token) {
  // Set auth token header auth to axios on every request
  setAuthToken(token);
}


const App = () => (
  <Provider store={store}>
    <div>Niaje wasee ndio hii hapa!</div>
  </Provider>
);

export default App;
