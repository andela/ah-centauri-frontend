import { api } from '../services/Api';
import {
  LIKE_ARTICLE,
  DISLIKE_ARTICLE,
  LIKE_DISLIKE_ERROR,
  GET_ARTICLE_DATA,
} from './types';
import { loadingMessage } from './authActions';
import getResponseErrors from '../utils/errorMessage';

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
})

export const likeErrorAction = data => ({
  type: LIKE_DISLIKE_ERROR,
  payload: data,
});

export const likeArticle = slug => async (dispatch) => {
//   dispatch(loadingMessage());
  try {
    const response = await api.articles.likeArticle(slug);
    dispatch(likeArticleAction(response.data));
    dispatch(fetchArticleDataAction(response.data.article));
  } catch (error) {
    if (error.response && error.response.data) {
      const { responseErrorsObject } = getResponseErrors(error.response.data);
      dispatch(likeErrorAction(responseErrorsObject));
    } else {
      dispatch(likeErrorAction({ errors: 'Something went wrong when fetching your profile.' }));
    }
  }
};

export const dislikeArticle = data => async (dispatch) => {
//   dispatch(loadingMessage());
  try {
    const response = await api.articles.dislikeArticle(data);
    dispatch(likeArticleAction(response.data));
    // dispatch(fetchArticleDataAction(response.data.article));
  } catch (error) {
    if (error.response && error.response.data) {
      const { responseErrorsObject } = getResponseErrors(error.response.data);
      dispatch(likeErrorAction(responseErrorsObject));
    } else {
      dispatch(likeErrorAction({ errors: 'Something went wrong when fetching your profile.' }));
    }
  }
};
