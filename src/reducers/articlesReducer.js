import {
  FETCH_ALL_ARTICLES,
  ERROR_FETCHING_ARTICLES,
  LOADING_PROGRESS,
} from '../actions/types';

const INITIAL_STATE = {
  articles: [],
  errorMessage: {},
  successMessage: '',
  loading: false,
};

export default function (state = INITIAL_STATE, actions) {
  switch (actions.type) {
    case LOADING_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_ARTICLES:
      return {
        ...state,
        articles: actions.payload,
        errorMessage: {},
        loading: false,
      };
    case ERROR_FETCHING_ARTICLES:
      return {
        ...state,
        errorMessage: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
