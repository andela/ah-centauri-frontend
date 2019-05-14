import {
  ERROR_FETCHING_ARTICLES,
  FETCH_ALL_ARTICLES
} from './types';
import { api } from '../services/Api';


export const successMessage = data => ({
  type: FETCH_ALL_ARTICLES,
  payload: data,
});


export const errorMessage = errors => ({
  type: ERROR_FETCHING_ARTICLES,
  payload: errors,
});

export const getAllArticles = () => dispatch => api.articles.getAllArticles()
  .then((reponse) => {
    dispatch(successMessage(reponse.data.article.results));
  }).catch((error) => {
    dispatch(errorMessage(error.response.data));
  });
