import expect from 'expect/build/index';
import { likeArticleAction,
  dislikeArticleAction,
  fetchArticleDataAction,
  likeErrorAction
} from '../likeActions';
import {
  LIKE_ARTICLE,
  DISLIKE_ARTICLE,
  LIKE_DISLIKE_ERROR,
  GET_ARTICLE_DATA,
} from '../types';


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
});
