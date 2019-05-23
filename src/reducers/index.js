import { combineReducers } from 'redux';

import authReducer from './authReducer';
import profileReducer from './profileReducer';
import resetReducer from './resetReducer';
import articlesReducer from './articlesReducer';
import likeReducers from './likeReducers';
import articleRatingReducer from './articleRatingReducer';
import bookmarksReducer from './bookmarksReducer';
import notificationsReducer from './notificationsReducer';
import commentsReducer from './commentsReducer';

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  resetReducer,
  articles: articlesReducer,
  likes: likeReducers,
  rating: articleRatingReducer,
  bookmarks: bookmarksReducer,
  notifications: notificationsReducer,
  comments: commentsReducer,
});
