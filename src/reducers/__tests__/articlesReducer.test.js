import expect from 'expect';
import reducer from '../articlesReducer';
import {
  loadingMessage,
  successMessage,
  errorMessage,
  singleArticleSuccessMessage,
  CreateArticleSuccessMessage,
  deleteSuccessMessage,
} from '../../actions/articlesActions';


const INITIAL_STATE = {
  articles: [],
  article: {},
  errorMessage: {},
  successMessage: '',
  loading: false,
};

describe('Testing ARTICLEREDUCER', () => {
  const articles = [{ slug: 'test' }];
  const article = { slug: 'test-1' };
  const errors = { errors: { title: 'test' } };

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
    const successMessageAction = successMessage(articles);
    const state = reducer(INITIAL_STATE, successMessageAction);
    const expectedState = {
      ...INITIAL_STATE,
      articles,
      errorMessage: {},
      loading: false,
    };
    expect(state)
      .toEqual(expectedState);
  });

  it('should handle FETCH_SINGLE_ARTICLE', () => {
    const singleArticleSuccessMessageAction = singleArticleSuccessMessage(article);
    const state = reducer(INITIAL_STATE, singleArticleSuccessMessageAction);
    const expectedState = {
      ...INITIAL_STATE,
      article,
      errorMessage: {},
      loading: false,
    };
    expect(state)
      .toEqual(expectedState);
  });

  it('should handle CREATE_SINGLE_ARTICLE', () => {
    const CreateArticleSuccessMessageAction = CreateArticleSuccessMessage(article);
    const state = reducer(INITIAL_STATE, CreateArticleSuccessMessageAction);
    const expectedState = {
      ...INITIAL_STATE,
      articles: [...INITIAL_STATE.articles, article],
      errorMessage: {},
      loading: false,
    };
    expect(state)
      .toEqual(expectedState);
  });

  it('should handle DELETE_SINGLE_ARTICLE', () => {
    const deleteSuccessMessageAction = deleteSuccessMessage(article);
    const state = reducer(INITIAL_STATE, deleteSuccessMessageAction);
    const expectedState = {
      ...INITIAL_STATE,
      articles: INITIAL_STATE.articles.filter(item => item.slug !== article.slug),
      errorMessage: {},
      loading: false,
    };
    expect(state)
      .toEqual(expectedState);
  });

  it('should handle ERROR_FETCHING_ARTICLES', () => {
    const errorMessageAction = errorMessage(errors);
    const state = reducer(INITIAL_STATE, errorMessageAction);
    const expectedState = {
      ...INITIAL_STATE,
      errorMessage: errors,
      loading: false,
    };
    expect(state)
      .toEqual(expectedState);
  });
});
