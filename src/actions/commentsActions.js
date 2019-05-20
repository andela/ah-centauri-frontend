import {
  ERROR_FETCHING_COMMENTS,
  FETCH_ALL_COMMENTS,
  ERROR_FETCHING_REPLIES,
  FETCH_ALL_REPLIES,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  EDIT_COMMENT_SUCCESS,
  POST_REPLY_FAILURE,
} from './types';
import { api } from '../services/Api';

export const successMessage = data => {
  return {
    type: FETCH_ALL_COMMENTS,
    payload: data,
  }
};

export const errorMessage = errors => {
  return {
    type: ERROR_FETCHING_COMMENTS,
    payload: errors,
  }
};

export const successReplies = data => {
  return {
    type: FETCH_ALL_REPLIES,
    payload: data,
  }
};

export const errorReplies = errors => {
  return {
    type: ERROR_FETCHING_REPLIES,
    payload: errors,
  }
};

export const createCommentSuccess = data => {
  return {
    type: CREATE_COMMENT_SUCCESS,
    payload: data,
  }
};

export const createCommentFailure = errors => {
  return {
    type: CREATE_COMMENT_FAILURE,
    payload: errors,
 }
};

export const deleteCommentSuccess = id => {
  return {
    type: DELETE_COMMENT_SUCCESS,
    payload: id,
  }
};

export const deleteCommentFailure = errors => {
  return {
    type: DELETE_COMMENT_FAILURE,
    payload: errors,
 }
};

export const editCommentSuccess = data => {
  return {
    type: EDIT_COMMENT_SUCCESS,
    payload: data,
  }
};

export const editCommentFailure = errors => {
  return {
    type: EDIT_COMMENT_FAILURE,
    payload: errors,
  }
};

export const postReplyFailure = errors => {
  return {
    type: POST_REPLY_FAILURE,
    payload: errors,
  }
};

export const getAllComments = slug => dispatch => {
  return api.comments.getAllComments(slug)
  .then((response) => {
    dispatch(successMessage(response.data));
  }).catch((error) => {
    dispatch(errorMessage(error.response.data));
  });
}

export const getAllReplies = data => dispatch => {
  return api.comments.getAllReplies(data)
  .then((response) => {
    dispatch(successReplies(response.data));
  }).catch((error) => {
    dispatch(errorReplies(error.response.data))
  });
}

export const createComment = data => dispatch => {
  return api.comments.createComment(data)
  .then((response) => {
    dispatch(createCommentSuccess(response.data.comment));
  }).catch((error) => {
    dispatch(createCommentFailure(error.response.data))
  });
}

export const deleteComment = data => dispatch => {
  return api.comments.deleteComment(data)
  .then(() => {
    dispatch(deleteCommentSuccess(data.comment_id));
    dispatch(getAllComments(data.slug))
  }).catch((error) => {
    dispatch(deleteCommentFailure(error.response.data))
  });
}

export const editComment = data => dispatch => {
  return api.comments.editComment(data)
  .then((response) => {
    dispatch(editCommentSuccess(response.data.comment));
  }).catch((error) => {
    dispatch(editCommentFailure(error.response.data))
  });
}

export const postReply = data => dispatch => {
  const reply = {
    slug: data.slug,
    parent_id: data.payload.comment.parent
  }
  return api.comments.postReply(data)
  .then((response) => {
    dispatch(getAllComments(data.slug));
    dispatch(getAllReplies(reply))
  }).catch((error) => {
    dispatch(postReplyFailure(error.response.data))
  });
}
