import expect from 'expect';
import reducer from '../analyticsReducers';

import {
  statsMessage,
} from '../../actions/analyticsActions';
import {
  STATS_LOADING_PROGRESS,
  FETCH_MY_ARTICLE_VIEWS,
  FETCH_ALL_MY_VIEWS,
} from '../../actions/types';
import { loadingMessage } from '../../actions/articlesActions';

const INITIAL_STATE = {
  myArticleViews: [],
  myArticleViewsCount: 0,
  views: [],
  viewsCount: 0,
  errorMessage: {},
  loading: false,
};


const payload = {
  views: [
    {
      id: 7,
      user: 'alpha',
      article: {
        title: 'try',
        description: 'again',
        slug: 'try',
        author: 'valerie',
        created_at: '2019-05-22 15:29:04.807719+00:00',
        totalViews: 5,
      },
      full_read: false,
    },
  ],
  viewsCount: 1,
};

describe('Testing ARTICLE REDUCER', () => {
  it('should return the initial state', () => {
    const state = reducer(INITIAL_STATE, {});
    expect(state).toEqual(INITIAL_STATE);
  });

  it('should handle STATS_LOADING_PROGRESS', () => {
    const loadingAction = loadingMessage(STATS_LOADING_PROGRESS);
    const state = reducer(INITIAL_STATE, loadingAction);
    const expectedState = {
      ...INITIAL_STATE,
      loading: true,
    };
    expect(state)
      .toEqual(expectedState);
  });

  it('should handle FETCH_MY_ARTICLE_VIEWS', () => {
    const fetchMyArticleViewsStats = statsMessage(FETCH_MY_ARTICLE_VIEWS, payload);
    const expectedState = {
      ...INITIAL_STATE,
      myArticleViews: payload.views,
      myArticleViewsCount: payload.viewsCount,
      errorMessage: {},
      loading: false,
    };
    const state = reducer(INITIAL_STATE, fetchMyArticleViewsStats);
    expect(state).toEqual(expectedState);
  });

  it('should handle FETCH_ALL_MY_VIEWS', () => {
    const fetchMyViewedArticleStats = statsMessage(FETCH_ALL_MY_VIEWS, payload);
    const expectedState = {
      ...INITIAL_STATE,
      views: payload.views,
      viewsCount: payload.viewsCount,
      errorMessage: {},
      loading: false,
    };
    const state = reducer(INITIAL_STATE, fetchMyViewedArticleStats);
    expect(state).toEqual(expectedState);
  });
});
