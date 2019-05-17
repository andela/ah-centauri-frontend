import { combineReducers } from 'redux';

import authReducer from './authReducer';
import profileReducer from './profileReducer';
import resetReducer from './resetReducer';
import articlesReducer from './articlesReducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  resetReducer,
  articles: articlesReducer,
});
