import expect from 'expect';
import reducer from '../likeReducers';
import {dislikeArticleAction, likeArticleAction,} from '../../actions/likeActions';
import {fetchArticleDataAction} from '../../actions/articlesActions';


const INITIAL_STATE = {
  currentArticle: {},
  liked: false,
  likes: 0,
  disliked: false,
  dislikes: 0,
};

const article = {
  id: 22,
  likes: 0,
  dislikes: 1,
  has_liked: false,
  has_disliked: false,
  created_at: '2019-05-17T13:32:04.578699Z',
  updated_at: '2019-05-17T13:32:04.578736Z',
};

describe('Testing likeReducer', () => {
  it('should return the initial state', () => {
    const state = reducer(INITIAL_STATE, {});
    expect(state).toEqual(INITIAL_STATE);
  });

  it('should handle fetchArticleDataAction', () => {
    const state = reducer(INITIAL_STATE, fetchArticleDataAction(article));
    const expectedState = {
      ...INITIAL_STATE,
      currentArticle: article,
      liked: article.has_liked,
      disliked: article.has_disliked,
      likes: article.likes,
      dislikes: article.dislikes,
    };
    expect(state)
      .toEqual(expectedState);
  });

  it('should handle likeArticleAction', () => {
    const payload = {
      like_count: 1,
      dislike_count: 0,
    };
    const like = likeArticleAction(payload);
    const expectedState = {
      ...INITIAL_STATE,
      liked: true,
      disliked: false,
      likes: 1,
      dislikes: 0,
    };
    const state = reducer(INITIAL_STATE, like);
    expect(state).toEqual(expectedState);
  });

  it('should handle dislikeArticleAction', () => {
    const payload = {
      like_count: 0,
      dislike_count: 1,
    };
    const dislike = dislikeArticleAction(payload);
    const expectedState = {
      ...INITIAL_STATE,
      liked: false,
      disliked: true,
      likes: 0,
      dislikes: 1,
    };
    const state = reducer(INITIAL_STATE, dislike);
    expect(state).toEqual(expectedState);
  });
});
