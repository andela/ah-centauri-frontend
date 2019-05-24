import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { API_HOST } from '../../services/Api';
import {
  searchArticleAction,
  searchArticles,
} from '../searchActions';
import {
  SEARCH_ARTICLES,
} from '../types';
import { errorMessage } from '../articlesActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore();

describe('search Actions', () => {

  it('should handle search action', () => {
    const search = {
      results: [],
      count: 0,
    };
    const searchActions = searchArticleAction(search);
    const expectedAction = {
      type: SEARCH_ARTICLES,
      payload: search,
    };
    expect(searchActions).toEqual(expectedAction);
  });
});

describe('search API calls', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });

  const data = {
    key: 'author',
    value: 'ken',
  };

  const article = {
    author: 'ken',
    slug: 'a blog by ken',
  };

  it('searches an article when given key and value', async (done) => {
    const payload = { count: 1, results: [article] };
    const expectedActions = searchArticleAction(payload);

    moxios.stubRequest(`${API_HOST}/articles/q?${data.key}=${data.value}`, {
      status: 200,
      response: {
        count: 1,
        results: [article],
      },
    });

    await store.dispatch(searchArticles(data));
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });

  it('error when it searches an article', async (done) => {
    const payload = { error: 'errors', message: 'errors errors' };
    const expectedActions = errorMessage(payload);

    moxios.stubRequest(`${API_HOST}/articles/q?${data.key}=${data.value}`, {
      status: 404,
      response: {
        error: 'errors',
        message: 'errors errors',
      },
    });

    await store.dispatch(searchArticles(data));
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });
});
