import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import expect from 'expect/build/index';
import moxios from 'moxios';
import {
  likeArticleAction,
  dislikeArticleAction,
  likeErrorAction,
  fetchCommentDataAction,
  fetchCommentErrorAction,
  getSingleComment,
  likeComment,
  dislikeComment,
} from '../likeActions';
import {
  LIKE_ARTICLE,
  DISLIKE_ARTICLE,
  LIKE_DISLIKE_ERROR,
  GET_COMMENT_DATA,
  GET_COMMENT_ERROR,
} from '../types';
import { API_HOST } from '../../services/Api';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const store = mockStore();

describe('like dislike Actions', () => {
  it('should handle like action', () => {
    const like = {
      like_count: 3,
      dislike_count: 0,
    };
    const likeActions = likeArticleAction(like);
    const expectedAction = {
      type: LIKE_ARTICLE,
      payload: like,
    };
    expect(likeActions).toEqual(expectedAction);
  });

  it('should handle dislike error action', () => {
    const like = {
      message: 'error error',
    };
    const errorActions = likeErrorAction(like);
    const expectedAction = {
      type: LIKE_DISLIKE_ERROR,
      payload: like,
    };
    expect(errorActions).toEqual(expectedAction);
  });

  it('should handle like action', () => {
    const like = {
      like_count: 3,
      dislike_count: 0,
    };
    const likeActions = dislikeArticleAction(like);
    const expectedAction = {
      type: DISLIKE_ARTICLE,
      payload: like,
    };
    expect(likeActions).toEqual(expectedAction);
  });

  it('should handle get comment action', () => {
    const payload = { comment: { id: 5 } };
    const fetchComment = fetchCommentDataAction(payload);
    const expectedAction = {
      type: GET_COMMENT_DATA,
      payload,
    };
    expect(fetchComment).toEqual(expectedAction);
  });

  it('should handle get comment error', () => {
    const payload = { errors: 'something went wrong' };
    const fetchCommentError = fetchCommentErrorAction(payload);
    const expectedAction = {
      type: GET_COMMENT_ERROR,
      payload,
    };
    expect(fetchCommentError).toEqual(expectedAction);
  });
});

describe('Test fetch comment axios actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const slug = 'path';
  const data = {
    slug: 'path',
    id: 12,
  };

  it('creates GET_COMMENT_DATA when fetch comment is successful', async (done) => {
    const payload = { id: 25 };

    const expectedActions = fetchCommentDataAction(payload);

    moxios.stubRequest(`${API_HOST}/articles/${data.slug}/comments/${data.id}/`, {
      status: 200,
      response: {
        comment: { id: 25 },
      },
    });

    await store.dispatch(getSingleComment(data));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });

  it('creates GET_COMMENT_ERROR when fetch comment is unsuccessful', async (done) => {
    const payload = {
      errors: 'something goes wrong',
    };

    const expectedActions = fetchCommentErrorAction(payload);

    moxios.stubRequest(`${API_HOST}/articles/${data.slug}/comments/${data.id}/`, {
      status: 400,
      response: {
        errors: 'something goes wrong',
      },
    });

    await store.dispatch(getSingleComment(data));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });
});
