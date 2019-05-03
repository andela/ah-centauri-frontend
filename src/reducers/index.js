import { combineReducers } from 'redux';

import authReducer from './authReducer';
import resetReducer from '../reducers/resetReducer';

export default combineReducers({
  auth: authReducer,
  resetReducer
});

