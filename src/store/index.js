import {
  applyMiddleware,
  createStore,
} from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from '../reducers';
import setAuthToken from '../utils/setAuthToken';


const token = localStorage.getItem('AUTH_TOKEN');

if (token) {
  // Set auth token header auth to axios on every request
  setAuthToken(token);
}

export default createStore(
  reducers,
  {
    auth: { authenticated: !!token },
  },
  composeWithDevTools(applyMiddleware(reduxThunk)),
);
