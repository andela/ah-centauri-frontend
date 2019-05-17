import {
  ERROR_FETCHING_ARTICLES,
  FETCH_ALL_ARTICLES,
  FETCH_SINGLE_ARTICLE,
  CREATE_SINGLE_ARTICLE,
  DELETE_SINGLE_ARTICLE,
  LOADING_PROGRESS,
} from '../actions/types';

const INITIAL_STATE = {
  articles: [],
  article: {},
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
    case FETCH_SINGLE_ARTICLE:
      return {
        ...state,
        article: actions.payload,
        errorMessage: {},
        loading: false,
      };
    case CREATE_SINGLE_ARTICLE:
      return {
        ...state,
        articles: [...state.articles, actions.payload],
        errorMessage: {},
        loading: false,
      };
    case DELETE_SINGLE_ARTICLE:
      return {
        ...state,
        articles: state.articles.filter(article => article.slug !== actions.payload),
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
