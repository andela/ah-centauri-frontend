import {
  COMMENT_HISTORY_LOADING_PROGRESS,
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  EDIT_COMMENT_SUCCESS,
  ERROR_FETCHING_COMMENTS,
  ERROR_FETCHING_REPLIES,
  FETCH_ALL_COMMENTS,
  FETCH_ALL_REPLIES,
  FETCH_COMMENT_HISTORY_ERROR,
  FETCH_COMMENT_HISTORY_SUCCESS,
  POST_REPLY_FAILURE,
} from './types';
import {api} from '../services/Api';
import {loadingMessage} from './authActions';

export const successMessage = data => ({
  type: FETCH_ALL_COMMENTS,
  payload: data,
});

export const successEditHistory = data => ({
  type: FETCH_COMMENT_HISTORY_SUCCESS,
  payload: data,
});

export const errorEditHistory = errors => ({
  type: FETCH_COMMENT_HISTORY_ERROR,
  payload: errors,
});

export const errorMessage = errors => ({
  type: ERROR_FETCHING_COMMENTS,
  payload: errors,
});

export const successReplies = data => ({
  type: FETCH_ALL_REPLIES,
  payload: data,
});

export const errorReplies = errors => ({
  type: ERROR_FETCHING_REPLIES,
  payload: errors,
});

export const createCommentSuccess = data => ({
  type: CREATE_COMMENT_SUCCESS,
  payload: data,
});

export const createCommentFailure = errors => ({
  type: CREATE_COMMENT_FAILURE,
  payload: errors,
});

export const deleteCommentSuccess = id => ({
  type: DELETE_COMMENT_SUCCESS,
  payload: id,
});

export const deleteCommentFailure = errors => ({
  type: DELETE_COMMENT_FAILURE,
  payload: errors,
});

export const editCommentSuccess = data => ({
  type: EDIT_COMMENT_SUCCESS,
  payload: data,
});

export const editCommentFailure = errors => ({
  type: EDIT_COMMENT_FAILURE,
  payload: errors,
});

export const postReplyFailure = errors => ({
  type: POST_REPLY_FAILURE,
  payload: errors,
});

export const getAllComments = slug => dispatch => api.comments.getAllComments(slug)
  .then((response) => {
    dispatch(successMessage(response.data));
  }).catch((error) => {
    dispatch(errorMessage(error.response.data));
  });

export const getEditHistory = commentId => (dispatch) => {
  dispatch(loadingMessage(COMMENT_HISTORY_LOADING_PROGRESS));
  return api.comments.getEditHistory(commentId)
      .then((response) => {
        dispatch(successEditHistory(response.data));
      }).catch((error) => {
        dispatch(errorEditHistory(error.response.data || {errors: 'Something went wrong when fetching comment the comment edit history'}));
      });
};

export const getAllReplies = data => dispatch => api.comments.getAllReplies(data)
  .then((response) => {
    dispatch(successReplies(response.data));
  }).catch((error) => {
      dispatch(errorReplies(error.response.data));
  });

export const createComment = data => dispatch => api.comments.createComment(data)
  .then((response) => {
    dispatch(createCommentSuccess(response.data.comment));
  }).catch((error) => {
      dispatch(createCommentFailure(error.response.data));
  });

export const deleteComment = data => dispatch => api.comments.deleteComment(data)
  .then(() => {
    dispatch(deleteCommentSuccess(data.comment_id));
    dispatch(getAllComments(data.slug));
  }).catch((error) => {
      dispatch(deleteCommentFailure(error.response.data));
  });

export const editComment = data => dispatch => api.comments.editComment(data)
  .then((response) => {
    dispatch(editCommentSuccess(response.data.comment));
  }).catch((error) => {
      dispatch(editCommentFailure(error.response.data));
  });

export const postReply = data => (dispatch) => {
  const reply = {
    slug: data.slug,
    parent_id: data.payload.comment.parent,
  };
  return api.comments.postReply(data)
      .then((response) => {
        dispatch(getAllComments(data.slug));
        dispatch(getAllReplies(reply));
      }).catch((error) => {
        dispatch(postReplyFailure(error.response.data));
      });
};
