import { api } from '../services/Api';
import {
  SEARCH_ARTICLES,
} from './types';
import { errorMessage } from './articlesActions';

export const searchArticleAction = data => ({
  type: SEARCH_ARTICLES,
  payload: data,
});


export const searchArticles = data => (dispatch) => {
  return api.articles.searchArticles(data)
    .then((response) => {
      dispatch(searchArticleAction(response.data));
    })
    .catch((error) => {
      dispatch(errorMessage(error.response.data));
    });
};
