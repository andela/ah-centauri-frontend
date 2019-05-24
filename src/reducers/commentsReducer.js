import {
  AUTH_SIGNOUT,
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
  GET_COMMENT_DATA,
  POST_REPLY_FAILURE,
} from '../actions/types';

export const INITIAL_STATE = {
  comments: [],
  replies: [],
  errorMessage: '',
  GET_COMMENT_DATA,
  editHistory: [],
};

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case COMMENT_HISTORY_LOADING_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COMMENT_HISTORY_SUCCESS:
      return {
        ...state,
        editHistory: payload.comments,
        loading: false,
      };
    case FETCH_COMMENT_HISTORY_ERROR:
      return {
        ...state,
        editHistory: [],
        loading: false,
      };
    case FETCH_ALL_COMMENTS:
      return {
        ...state,
        comments: payload.comments,
      };
    case ERROR_FETCHING_COMMENTS:
      return {
        ...state,
        errorMessage: payload,
      };
    case FETCH_ALL_REPLIES:
      return {
        ...state,
        replies: payload.comments,
      };
    case ERROR_FETCHING_REPLIES:
      return {
        ...state,
        errorMessage: payload,
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [...state.comments, payload],
      };
    case CREATE_COMMENT_FAILURE:
      return {
        ...state,
        errorMessage: payload,
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter(comment => comment.id != payload),
        replies: state.replies.filter(reply => reply.id != payload),
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        errorMessage: payload,
      };
    case EDIT_COMMENT_SUCCESS:
      const updatedComments = state.comments.map((item) => {
        if (item.id === payload.id) {
          return { ...item, ...payload };
        }
        return item;
      });
      const updatedReplies = state.replies.map((item) => {
        if (item.id === payload.id) {
          return { ...item, ...payload };
        }
        return item;
      });
      return {
        ...state,
        comments: updatedComments,
        replies: updatedReplies,
      };
    case EDIT_COMMENT_FAILURE:
      return {
        ...state,
        errorMessage: payload,
      };
    case POST_REPLY_FAILURE:
      return {
        ...state,
        errorMessage: payload,
      };
    case GET_COMMENT_DATA:
      const likedComments = state.comments.map((item) => {
        if (item.id === payload.id) {
          return { ...item, ...payload };
        }
        return item;
      });
      const likedReplies = state.replies.map((item) => {
        if (item.id === payload.id) {
          return { ...item, ...payload };
        }
        return item;
      });
      return {
        ...state,
        comments: likedComments,
        replies: likedReplies,
      };
    case AUTH_SIGNOUT:
      return {
        ...state,
        editHistory: [],
        loading: false,
      };
    default:
      return state;
  }
}
