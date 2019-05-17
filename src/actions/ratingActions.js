import {
  UPDATE_ARTICLE_RATING,
  ARTICLE_RATING_UPDATED,
  ARTICLE_RATING_FAILED,
} from './types';
import { api } from '../services/Api';
import { loadingMessage } from './authActions';
import { getSingleArticles } from './articlesActions';

export const updateRatingAction = data => ({
  type: UPDATE_ARTICLE_RATING,
  payload: data,
});

export const articleRated = data => ({
  type: ARTICLE_RATING_UPDATED,
  payload: data,
});

export const articleRateFailure = data => ({
  type: ARTICLE_RATING_FAILED,
  payload: data,
});

export const updateRating = data => (dispatch) => {
  dispatch(loadingMessage());
  return api.articles.updateArticleRating({ rating: data })
    .then((response) => {
      dispatch(articleRated(response.data));
      dispatch(getSingleArticles(data.slug));
    })
    .catch((error) => {
      dispatch(articleRateFailure(error.response.data));
    });
};
