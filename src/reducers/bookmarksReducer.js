import {
  LOADING_PROGRESS,
  FETCH_ALL_BOOKMARKS,
  CREATE_SINGLE_BOOKMARK,
  DELETE_SINGLE_BOOKMARK,
} from '../actions/types';

const INITIAL_STATE = {
  bookmarks: [],
  errorMessage: {},
  loading: false,
};

export default function (state = INITIAL_STATE, actions) {
  switch (actions.type) {
    case LOADING_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_BOOKMARKS:
      return {
        ...state,
        bookmarks: actions.payload,
        loading: false,
      };
    case CREATE_SINGLE_BOOKMARK:
      return {
        ...state,
        bookmarks: [...state.bookmarks, actions.payload],
        loading: false,
      };
    case DELETE_SINGLE_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== actions.payload),
        loading: false,
      };
    default:
      return state;
  }
}
