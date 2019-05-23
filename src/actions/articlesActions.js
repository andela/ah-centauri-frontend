import {
  ARTICLE_LOADING_PROGRESS,
  CREATE_SINGLE_ARTICLE,
  DELETE_SINGLE_ARTICLE,
  ERROR_FETCHING_ARTICLES,
  FETCH_ALL_ARTICLES,
  FETCH_SINGLE_ARTICLE,
  LOADING_PROGRESS,
} from './types';
import { api } from '../services/Api';
import { fetchArticleDataAction } from './likeActions';

export const loadingMessage = (type = LOADING_PROGRESS) => ({
  type,
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

export const getAllArticles = page => (dispatch) => {
  dispatch(loadingMessage(ARTICLE_LOADING_PROGRESS));
  return api.articles.getAllArticles(page)
    .then((reponse) => {
      dispatch(successMessage(reponse.data.article));
    }).catch((error) => {
      dispatch(errorMessage(error.response.data));
    });
};

export const getSingleArticles = (slug, history) => (dispatch) => {
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
  dispatch(loadingMessage(ARTICLE_LOADING_PROGRESS));
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
  dispatch(loadingMessage(ARTICLE_LOADING_PROGRESS));
  return api.articles.filterByAuthorArticles(data)
    .then((response) => {
      dispatch(successMessage(response.data.articles));
    }).catch((error) => {
      dispatch(errorMessage(error.response.data));
    });
};

export const deleteArticle = slug => (dispatch) => {
  dispatch(loadingMessage(ARTICLE_LOADING_PROGRESS));
  return api.articles.deleteArticle(slug)
    .then((response) => {
      dispatch(deleteSuccessMessage(slug));
    });
};
