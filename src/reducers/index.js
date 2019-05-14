import { combineReducers } from 'redux';

import authReducer from './authReducer';
import profileReducer from './profileReducer';
import resetReducer from '../reducers/resetReducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  resetReducer,
});
