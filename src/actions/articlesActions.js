import {
  ERROR_FETCHING_ARTICLES,
  FETCH_ALL_ARTICLES,
  FETCH_SINGLE_ARTICLE,
  CREATE_SINGLE_ARTICLE,
  DELETE_SINGLE_ARTICLE,
  LOADING_PROGRESS,
} from './types';
import { api } from '../services/Api';

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

export const getAllArticles = () => dispatch => api.articles.getAllArticles()
  .then((response) => {
    dispatch(successMessage(response.data.article.results));
  }).catch((error) => {
    dispatch(errorMessage(error.response.data));
  });


export const getSingleArticles = (slug, history) => dispatch => api.articles.getSingleArticles(slug)
  .then((response) => {
    dispatch(singleArticleSuccessMessage(response.data.article));
  }).catch((error) => {
    dispatch(errorMessage(error.response.data));
    history.push('/not-found');
  });

export const createArticles = (data, history) => dispatch => api.articles.createArticles(data)
  .then((response) => {
    dispatch(CreateArticleSuccessMessage(response.data.article));
    history.push('/');
  }).catch((error) => {
    dispatch(errorMessage(error.response.data));
  });

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

export const filterByAuthorArticles = data => dispatch => api.articles.filterByAuthorArticles(data)
  .then((response) => {
    dispatch(successMessage(response.data.articles.results));
  }).catch((error) => {
    dispatch(errorMessage(error.response.data));
  });

export const deleteArticle = slug => dispatch => api.articles.deleteArticle(slug)
  .then(() => {
    dispatch(deleteSuccessMessage(slug));
  }).catch((error) => {
    dispatch(errorMessage(error.response.data));
  });
