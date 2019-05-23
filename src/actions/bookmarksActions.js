import {api} from '../services/Api';
import {
  BOOKMARKS_LOADING_PROGRESS,
  CREATE_SINGLE_BOOKMARK_ERROR,
  CREATE_SINGLE_BOOKMARK_SUCCESS,
  DELETE_SINGLE_BOOKMARK_ERROR,
  DELETE_SINGLE_BOOKMARK_SUCCESS,
  FETCH_ALL_BOOKMARKS_ERROR,
  FETCH_ALL_BOOKMARKS_SUCCESS,
} from './types';
import getResponseErrors from '../utils/errorMessage';
import {loadingMessage} from './authActions';

export const bookmarksuccessMessage = responseData => ({
  type: FETCH_ALL_BOOKMARKS_SUCCESS,
  payload: responseData,
});

export const CreateBookmarkSuccessMessage = responseData => ({
  type: CREATE_SINGLE_BOOKMARK_SUCCESS,
  payload: responseData,
});

export const deleteBookmarkSuccessMessage = payload => ({
  type: DELETE_SINGLE_BOOKMARK_SUCCESS,
  payload: { message: payload.message, id: payload.id },
});

export function failureMessage(error, type = FETCH_ALL_BOOKMARKS_ERROR) {
  return { type, payload: error };
}

export const getAllbookmarkedArticles = () => (dispatch) => {
  dispatch(loadingMessage(BOOKMARKS_LOADING_PROGRESS));
  return api.bookmarks.getAllBookmarkArticle()
    .then((response) => {
      dispatch(bookmarksuccessMessage(response.data));
    }).catch((error) => {
      if (error.response && error.response.data) {
        const { responseErrorsObject } = getResponseErrors(error.response.data);
        dispatch(failureMessage(responseErrorsObject));
      } else {
        dispatch(failureMessage({ errors: 'Something went wrong when fetching your bookmarks.' }));
      }
    });
};

export const bookmarkArticle = slug => (dispatch) => {
  dispatch(loadingMessage(BOOKMARKS_LOADING_PROGRESS));
  return api.bookmarks.bookmarkArticle(slug)
    .then((response) => {
      dispatch(CreateBookmarkSuccessMessage(response.data));
    }).catch((error) => {
      if (error.response && error.response.data) {
        const { responseErrorsObject } = getResponseErrors(error.response.data);
        dispatch(failureMessage(responseErrorsObject, CREATE_SINGLE_BOOKMARK_ERROR));
      } else {
        dispatch(failureMessage({ errors: 'Something went wrong when creating your bookmarks.' }, CREATE_SINGLE_BOOKMARK_ERROR));
      }
    });
};

export const removeBookmark = id => dispatch => api.bookmarks.removeBookmark(id)
  .then((response) => {
    dispatch(deleteBookmarkSuccessMessage({ message: response.data.message, id }));
  }).catch((error) => {
    if (error.response && error.response.data) {
      const { responseErrorsObject } = getResponseErrors(error.response.data);
      dispatch(failureMessage(responseErrorsObject, DELETE_SINGLE_BOOKMARK_ERROR));
    } else {
      dispatch(failureMessage({ errors: 'Something went wrong when removing your bookmarks.' }, DELETE_SINGLE_BOOKMARK_ERROR));
    }
  });
