import {
  LOADING_PROGRESS,
  ERROR_FETCHING_ARTICLES,
  FETCH_ALL_ARTICLES,
  FETCH_SINGLE_ARTICLE,
  CREATE_SINGLE_ARTICLE,
  DELETE_SINGLE_ARTICLE,
  FETCH_ALL_BOOKMARKS,
  CREATE_SINGLE_BOOKMARK,
  DELETE_SINGLE_BOOKMARK,
} from './types';
import { api } from '../services/Api';
import { fetchArticleDataAction } from './likeActions';

export const loadingMessage = () => ({
  type: LOADING_PROGRESS,
});

export const successMessage = data => ({
  type: FETCH_ALL_ARTICLES,
  payload: data,
});

export const singleArticleSuccessMessage = data => ({
  type: FETCH_SINGLE_ARTICLE,
  payload: data,
});

export const CreateArticleSuccessMessage = data => ({
  type: CREATE_SINGLE_ARTICLE,
  payload: data,
});


export const errorMessage = errors => ({
  type: ERROR_FETCHING_ARTICLES,
  payload: errors,
});

export const deleteSuccessMessage = slug => ({
  type: DELETE_SINGLE_ARTICLE,
  payload: slug,
});

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

export const getAllArticles = page => (dispatch) => {
  dispatch(loadingMessage());
  return api.articles.getAllArticles(page)
    .then((reponse) => {
      dispatch(successMessage(reponse.data.article));
    }).catch((error) => {
      dispatch(errorMessage(error.response.data));
    });
};

export const getSingleArticles = (slug, history) => (dispatch) => {
  dispatch(loadingMessage());
  return api.articles.getSingleArticles(slug)
    .then((response) => {
      dispatch(singleArticleSuccessMessage(response.data.article));
      dispatch(fetchArticleDataAction(response.data.article));
    }).catch((error) => {
      dispatch(errorMessage(error.response.data));
      history.push('/not-found');
    });
};

export const createArticles = (data, history) => (dispatch) => {
  dispatch(loadingMessage());
  return api.articles.createArticles(data)
    .then((response) => {
      dispatch(CreateArticleSuccessMessage(response.data.article));
      history.push('/');
    }).catch((error) => {
      dispatch(errorMessage(error.response.data));
    });
};

export const updateArticles = (data, history) => dispatch => api.articles.updateArticles(data)
  .then((response) => {
    dispatch(CreateArticleSuccessMessage(response.data.article));
    history.push(`/me/stories/drafts/${response.data.article.author.username}`);
  }).catch((error) => {
    if (error.statusCode === 404) {
      history.push('/not-found');
    }
    dispatch(errorMessage(error.response.data));
  });

export const filterByAuthorArticles = data => (dispatch) => {
  dispatch(loadingMessage());
  return api.articles.filterByAuthorArticles(data)
    .then((response) => {
      dispatch(successMessage(response.data.articles));
    }).catch((error) => {
      dispatch(errorMessage(error.response.data));
    });
};

export const deleteArticle = slug => (dispatch) => {
  dispatch(loadingMessage());
  return api.articles.deleteArticle(slug)
    .then((response) => {
      dispatch(deleteSuccessMessage(slug));
    });
};

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
