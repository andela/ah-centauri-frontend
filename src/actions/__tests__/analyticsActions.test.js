import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { API_HOST } from '../../services/Api';
import {
  statsMessage,
  getMyViewedArticleStats,
  getMyArticleViewsStats,
} from '../analyticsActions';
import {
  STATS_LOADING_PROGRESS,
  FETCH_MY_ARTICLE_VIEWS,
  FETCH_ALL_MY_VIEWS,
  ERROR_FETCHING_STATS,
} from '../types';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore();

describe('Analytics Actions', () => {
  it('should handle statsMessage Action', () => {
    const statsActions = statsMessage(STATS_LOADING_PROGRESS);
    const expectedAction = {
      type: STATS_LOADING_PROGRESS,
    };
    expect(statsActions).toEqual(expectedAction);
  });
});

describe('Analytics API calls', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });

  const payload = { views: [], viewsCount: 0 };

  it('fetching all my stats on articles viewed', async (done) => {
    moxios.stubRequest(`${API_HOST}/analytics`, {
      status: 200,
      response: {
        views: [],
        viewsCount: 0,
      },
    });

    const statsActions = statsMessage(STATS_LOADING_PROGRESS);
    const expectedActions = statsMessage(FETCH_ALL_MY_VIEWS, payload);

    await store.dispatch(getMyViewedArticleStats());
    expect(store.getActions()).toEqual([statsActions, expectedActions]);
    done();
  });

  it('error when fetching all my stats on articles viewed', async (done) => {
    moxios.stubRequest(`${API_HOST}/analytics`, {
      status: 404,
      response: {
        errors: { details: 'Not found.' },
      },
    });

    const statsActions = statsMessage(STATS_LOADING_PROGRESS);
    const expectedActions = statsMessage(ERROR_FETCHING_STATS, { errors: { details: 'Not found.' } });

    await store.dispatch(getMyViewedArticleStats());
    expect(store.getActions()).toEqual([statsActions, expectedActions]);
    done();
  });

  it('fetching all my stats for my articles', async (done) => {
    moxios.stubRequest(`${API_HOST}/analytics/me`, {
      status: 200,
      response: {
        views: [],
        viewsCount: 0,
      },
    });

    const statsActions = statsMessage(STATS_LOADING_PROGRESS);
    const expectedActions = statsMessage(FETCH_MY_ARTICLE_VIEWS, payload);

    await store.dispatch(getMyArticleViewsStats());
    expect(store.getActions()).toEqual([statsActions, expectedActions]);
    done();
  });

  it('error when fetching all my stats for my articles', async (done) => {
    moxios.stubRequest(`${API_HOST}/analytics/me`, {
      status: 404,
      response: {
        errors: { details: 'No Articles Found.' },
      },
    });

    const statsActions = statsMessage(STATS_LOADING_PROGRESS);
    const expectedActions = statsMessage(ERROR_FETCHING_STATS, { errors: { details: 'No Articles Found.' } });

    await store.dispatch(getMyArticleViewsStats());
    expect(store.getActions()).toEqual([statsActions, expectedActions]);
    done();
  });
});
