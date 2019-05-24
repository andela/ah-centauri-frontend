import expect from 'expect';
import reducer from '../reportArticleReducer';

import {
  successMessage,
  reportAnArticleAction,
  failureMessage,
} from '../../actions/reportArticleActions';

import { loadingMessage } from '../../actions/articlesActions';

const INITIAL_STATE = {
  loading: false,
  loading: true,
  report: {"id": 1},
  errorMessage: {},
};

describe('Testing REPORT ARTICLE REDUCER', () => {
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
});
