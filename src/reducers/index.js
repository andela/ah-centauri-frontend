import { combineReducers } from 'redux';

import authReducer from './authReducer';
import profileReducer from './profileReducer';
import resetReducer from './resetReducer';
import articlesReducer from './articlesReducer';
import likeReducers from './likeReducers';
import articleRatingReducer from './articleRatingReducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  resetReducer,
  articles: articlesReducer,
  likes: likeReducers,
  rating: articleRatingReducer,
});
