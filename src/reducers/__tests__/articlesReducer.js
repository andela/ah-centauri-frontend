import expect from 'expect';
import reducer from '../articlesReducer';

import {
  errorMessage,
  successMessage,
  loadingMessage,
  singleArticleSuccessMessage,
  CreateArticleSuccessMessage,
  deleteSuccessMessage,
} from '../../actions/articlesActions';

import { setPage } from '../../actions/paginationActions';

const INITIAL_STATE = {
  articles: [],
  errorMessage: {},
  successMessage: '',
  currentPage: 0,
  loading: false,
};

describe('Testing ARTICLE REDUCER', () => {
  it('should return the initial state', () => {
    const state = reducer(INITIAL_STATE, {});
    expect(state).toEqual(INITIAL_STATE);
  });

  it('should handle LOADING_PROGRESS', () => {
    const loadingAction = loadingMessage();
    const state = reducer(INITIAL_STATE, loadingAction);
    const expectedState = {
      ...INITIAL_STATE,
      loading: true,
    };
    expect(state)
      .toEqual(expectedState);
  });

  it('should handle FETCH_ALL_ARTICLES', () => {
    const payload = {results: []};
    const fetchAllArticlesAction = successMessage(payload);
    const expectedState = {
      ...INITIAL_STATE,
        articles: payload.results,
        articlesCount: payload.count,
        errorMessage: {},
        loading: false,
    };
    const state = reducer(INITIAL_STATE, fetchAllArticlesAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle ERROR_FETCHING_ARTICLES', () => {
    const payload = {};
    const errorAction = errorMessage(payload);
    const expectedState = {
      ...INITIAL_STATE,
      errorMessage: payload,
      loading: false,
    };
    const state = reducer(INITIAL_STATE, errorAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle SET_PAGE', () => {
    const setPageAction = setPage(2);
    const expectedState = {
      ...INITIAL_STATE,
      currentPage: 2
    };
    const state = reducer(INITIAL_STATE, setPageAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle FETCH_SINGLE_ARTICLE', () => {
    const payload = {article: {}};
    const fetchSingleAction = singleArticleSuccessMessage(payload);
    const expectedState = {
      ...INITIAL_STATE,
      article: payload,
      errorMessage: {},
      loading: false,
    };
    const state = reducer(INITIAL_STATE, fetchSingleAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle CREATE_SINGLE_ARTICLE', () => {
    const payload = {article: {}};
    const createSingleAction = CreateArticleSuccessMessage(payload);
    const expectedState = {
      ...INITIAL_STATE,
      articles: [...INITIAL_STATE.articles, payload],
      loading: false,
    };
    const state = reducer(INITIAL_STATE, createSingleAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle DELETE_SINGLE_ARTICLE', () => {
    const payload = {slug: ''};
    const deleteSingleAction = deleteSuccessMessage(payload.slug);
    const expectedState = {
      ...INITIAL_STATE,
      articles: INITIAL_STATE.articles.filter(article => article.slug !== payload.slug),
      loading: false,
    };
    const state = reducer(INITIAL_STATE, deleteSingleAction);
    expect(state).toEqual(expectedState);
  });


});