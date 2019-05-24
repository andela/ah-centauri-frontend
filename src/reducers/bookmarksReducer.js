import {
  AUTH_SIGNOUT,
  BOOKMARKS_LOADING_PROGRESS,
  CREATE_SINGLE_BOOKMARK_ERROR,
  CREATE_SINGLE_BOOKMARK_SUCCESS,
  DELETE_SINGLE_BOOKMARK_ERROR,
  DELETE_SINGLE_BOOKMARK_SUCCESS,
  FETCH_ALL_BOOKMARKS_ERROR,
  FETCH_ALL_BOOKMARKS_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  bookmarks: [],
  errorMessage: {},
  loading: false,
};

export default function (state = INITIAL_STATE, actions) {
  switch (actions.type) {
    case BOOKMARKS_LOADING_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_BOOKMARKS_SUCCESS:
      return {
        ...state,
        bookmarks: actions.payload.bookmarks,
        message: actions.payload.message,
        errorMessage: {},
        loading: false,
      };
    case FETCH_ALL_BOOKMARKS_ERROR:
      // In case of an error the payload should have a JSON with error details
      //  i.e an 'errors' key with necessary error string or array of errors or
      //  'detail' key with error detail
      return {
        ...state,
        loading: false,
        bookmarks: undefined,
        errorMessage: actions.payload,
        message: '',
      };
    case CREATE_SINGLE_BOOKMARK_SUCCESS:
      console.log(actions.payload);
      return {
        ...state,
        bookmarks: [...state.bookmarks, actions.payload.bookmark],
        loading: false,
        message: actions.payload.message,
      };
    case CREATE_SINGLE_BOOKMARK_ERROR:
      // In case of an error the payload should have a JSON with error details
      //  i.e an 'errors' key with necessary error string or array of errors or
      //  'detail' key with error detail
      return {
        ...state,
        loading: false,
        errorMessage: actions.payload,
        message: '',
      };
    case DELETE_SINGLE_BOOKMARK_SUCCESS:

      return {
        ...state,
        bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== actions.payload.id),
        loading: false,
        message: actions.payload.message,
      };
    case DELETE_SINGLE_BOOKMARK_ERROR:
      // In case of an error the payload should have a JSON with error details
      //  i.e an 'errors' key with necessary error string or array of errors or
      //  'detail' key with error detail
      return {
        ...state,
        loading: false,
        errorMessage: actions.payload,
        message: '',
      };
    case AUTH_SIGNOUT:
      return {
        ...state,
        bookmarks: undefined,
        loading: false,
        message: '',
        errorMessage: {},
      };
    default:
      return state;
  }
}
