import { api } from '../services/Api';
import {
  errorMessage,
  loadingMessage,
} from './articlesActions';
import {
  CREATE_SINGLE_BOOKMARK,
  DELETE_SINGLE_BOOKMARK,
  FETCH_ALL_BOOKMARKS
} from './types';

export const bookmarksuccessMessage = bookmarks => ({
  type: FETCH_ALL_BOOKMARKS,
  payload: bookmarks,
});

export const CreateBookmarkSuccessMessage = bookmark => ({
  type: CREATE_SINGLE_BOOKMARK,
  payload: bookmark,
});

export const deleteBookmarkSuccessMessage = id => ({
  type: DELETE_SINGLE_BOOKMARK,
  payload: id,
});

export const getAllbookmarkedArticles = () => (dispatch) => {
  dispatch(loadingMessage());
  return api.bookmarks.getAllBookmarkArticle()
    .then((response) => {
      dispatch(bookmarksuccessMessage(response.data.bookmarks));
    }).catch((error) => {
      dispatch(errorMessage(error.response.data));
    });
};

export const bookmarkArticle = slug => (dispatch) => {
  dispatch(loadingMessage());
  return api.bookmarks.bookmarkArticle(slug)
    .then((response) => {
      dispatch(CreateBookmarkSuccessMessage(response.data.bookmark));
    }).catch((error) => {
      dispatch(errorMessage(error.response.data));
    });
};

export const unBookmarkArticle = id => (dispatch) => {
  dispatch(loadingMessage());
  return api.bookmarks.unBookmarkArticle(id)
    .then(() => {
      dispatch(deleteBookmarkSuccessMessage(id));
    }).catch((error) => {
      dispatch(errorMessage(error.response.data));
    });
};
