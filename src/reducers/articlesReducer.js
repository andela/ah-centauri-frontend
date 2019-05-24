import {
  ERROR_FETCHING_ARTICLES,
  FETCH_ALL_ARTICLES,
  FETCH_SINGLE_ARTICLE,
  CREATE_SINGLE_ARTICLE,
  DELETE_SINGLE_ARTICLE,
  SET_PAGE,
  SEARCH_ARTICLES,
  ARTICLE_LOADING_PROGRESS,
} from '../actions/types';

const INITIAL_STATE = {
  articles: [],
  article: {},
  articleSearchResults: [],
  searchCount: 0,
  errorMessage: {},
  successMessage: '',
  currentPage: 0,
  loading: false,
};

export default function (state = INITIAL_STATE, actions) {
  switch (actions.type) {
    case ARTICLE_LOADING_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_ARTICLES:
      return {
        ...state,
        articles: actions.payload.results,
        articlesCount: actions.payload.count,
        errorMessage: {},
        loading: false,
      };
    case SEARCH_ARTICLES:
      return {
        ...state,
        articleSearchResults: actions.payload.articles.results,
        searchCount: actions.payload.articles.count,
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
    case SET_PAGE:
      return {
        ...state,
        currentPage: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
