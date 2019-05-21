import expect from 'expect';
import bookmarksReducer from '../bookmarksReducer';
import {
  deleteBookmarkSuccessMessage,
  CreateBookmarkSuccessMessage,
  bookmarksuccessMessage,
} from '../../actions/bookmarksActions';
import { loadingMessage } from '../../actions/articlesActions';


const INITIAL_STATE = {
  bookmarks: [{ id: 21 }, { id: 3 }],
  errorMessage: {},
  loading: false,
};

describe('Test RESETREDUCER', () => {
  it('should return the initial state', () => {
    const state = bookmarksReducer(INITIAL_STATE, {});
    expect(state).toEqual(INITIAL_STATE);
  });

  it('should handle LOADING_PROGRESS', () => {
    const loadingMessageAction = loadingMessage();
    const expectedState = {
      ...INITIAL_STATE,
      loading: true,
    };
    const state = bookmarksReducer(INITIAL_STATE, loadingMessageAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle FETCH_ALL_BOOKMARKS', () => {
    const payload = [{ id: 1 }, { id: 2 }];
    const bookmarksuccessMessageAction = bookmarksuccessMessage(payload);
    const expectedState = {
      ...INITIAL_STATE,
      bookmarks: payload,
      loading: false,
    };
    const state = bookmarksReducer(INITIAL_STATE, bookmarksuccessMessageAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle CREATE_SINGLE_BOOKMARK', () => {
    const payload = { id: 3 };
    const CreateBookmarkSuccessMessageAction = CreateBookmarkSuccessMessage(payload);
    const expectedState = {
      ...INITIAL_STATE,
      bookmarks: [...INITIAL_STATE.bookmarks, payload],
      loading: false,
    };
    const state = bookmarksReducer(INITIAL_STATE, CreateBookmarkSuccessMessageAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle DELETE_SINGLE_BOOKMARK', () => {
    const payload = { id: 3 };
    const deleteBookmarkSuccessMessageAction = deleteBookmarkSuccessMessage(payload.id);
    const expectedState = {
      ...INITIAL_STATE,
      bookmarks: [{ id: 21 }],
      loading: false,
    };
    const state = bookmarksReducer(INITIAL_STATE, deleteBookmarkSuccessMessageAction);
    expect(state).toEqual(expectedState);
  });
});
