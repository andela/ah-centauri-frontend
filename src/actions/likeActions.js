import { api } from '../services/Api';
import {
  LIKE_ARTICLE,
  DISLIKE_ARTICLE,
  LIKE_DISLIKE_ERROR,
  GET_ARTICLE_DATA,
} from './types';
import { getSingleArticles } from './articlesActions';

export const likeArticleAction = data => ({
  type: LIKE_ARTICLE,
  payload: data,
});

export const dislikeArticleAction = data => ({
  type: DISLIKE_ARTICLE,
  payload: data,
});

export const fetchArticleDataAction = data => ({
  type: GET_ARTICLE_DATA,
  payload: data,
});

export const likeErrorAction = data => ({
  type: LIKE_DISLIKE_ERROR,
  payload: data,
});

export const likeArticle = slug => (dispatch) => {
  return api.articles.likeArticle(slug)
    .then((response) => {
      dispatch(likeArticleAction(response.data));
      dispatch(getSingleArticles(slug));
    })
    .catch((error) => {
      dispatch(likeErrorAction(error.response.data));
    });
};

export const dislikeArticle = slug => (dispatch) => {
  return api.articles.dislikeArticle(slug)
    .then((response) => {
      dispatch(dislikeArticleAction(response.data));
      dispatch(getSingleArticles(slug));
    })
    .catch((error) => {
      dispatch(likeErrorAction(error.response.data));
    });
};
