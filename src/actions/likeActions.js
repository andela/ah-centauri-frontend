import { api } from '../services/Api';
import {
  LIKE_ARTICLE,
  DISLIKE_ARTICLE,
  LIKE_DISLIKE_ERROR,
  GET_ARTICLE_DATA,
  GET_COMMENT_DATA,
  GET_COMMENT_ERROR,
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

export const fetchCommentDataAction = data => ({
  type: GET_COMMENT_DATA,
  payload: data,
});

export const fetchCommentErrorAction = data => ({
  type: GET_COMMENT_ERROR,
  payload: data,
});


export const getSingleComment = data => dispatch => api.comments.getSingleComment(data)
  .then((response) => {
    dispatch(fetchCommentDataAction(response.data.comment));
  })
  .catch((error) => {
    dispatch(fetchCommentErrorAction(error.response.data));
  });

export const likeArticle = slug => dispatch => api.articles.likeArticle(slug)
  .then((response) => {
    dispatch(likeArticleAction(response.data));
    dispatch(getSingleArticles(slug));
  })
  .catch((error) => {
    dispatch(likeErrorAction(error.response.data));
  });

export const dislikeArticle = slug => dispatch => api.articles.dislikeArticle(slug)
  .then((response) => {
    dispatch(dislikeArticleAction(response.data));
    dispatch(getSingleArticles(slug));
  })
  .catch((error) => {
    dispatch(likeErrorAction(error.response.data));
  });

export const likeComment = data => (dispatch) => {
  return api.comments.likeComment(data.id)
    .then((response) => {
      dispatch(getSingleComment(data));
    })
    .catch((error) => {
      dispatch(likeErrorAction(error.response.data));
    });
}

export const dislikeComment = data => (dispatch) => {
  return api.comments.dislikeComment(data.id)
    .then((response) => {
      dispatch(getSingleComment(data));
    })
    .catch((error) => {
      dispatch(likeErrorAction(error.response.data));
    });
}

