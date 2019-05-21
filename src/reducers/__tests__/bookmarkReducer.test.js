import expect from 'expect';
import bookmarksReducer from '../bookmarksReducer';
import {
  bookmarksuccessMessage,
  CreateBookmarkSuccessMessage,
  deleteBookmarkSuccessMessage,
  failureMessage,
} from '../../actions/bookmarksActions';
import {loadingMessage, signoutAction} from '../../actions/authActions';
import {
  BOOKMARKS_LOADING_PROGRESS,
  CREATE_SINGLE_BOOKMARK_ERROR,
  DELETE_SINGLE_BOOKMARK_ERROR,
} from '../../actions/types';


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

  it('Bookmark reducer should handle BOOKMARKS_LOADING_PROGRESS', () => {
    const loadingMessageAction = loadingMessage(BOOKMARKS_LOADING_PROGRESS);
    const expectedState = {
      ...INITIAL_STATE,
      loading: true,
    };
    const state = bookmarksReducer(INITIAL_STATE, loadingMessageAction);
    expect(state).toEqual(expectedState);
  });

  it(' Bookmark reducer should handle FETCH_ALL_BOOKMARKS_SUCCESS', () => {
    const payload = {
      bookmarks: [{ id: 1 }, { id: 2 }],
      message: 'Your bookmarks',
    };
    const bookmarksuccessMessageAction = bookmarksuccessMessage(payload);
    const expectedState = {
      ...INITIAL_STATE,
      bookmarks: payload.bookmarks,
      loading: false,
      message: payload.message,
    };
    const state = bookmarksReducer(INITIAL_STATE, bookmarksuccessMessageAction);
    expect(state).toEqual(expectedState);
  });

  it('Bookmark reducer should handle FETCH_ALL_BOOKMARKS_ERROR', () => {
    const payload = {
      errors: 'Authentication not provided.',
    };
    const bookmarkfailureMessageAction = failureMessage(payload);
    const expectedState = {
      ...INITIAL_STATE,
      bookmarks: undefined,
      loading: false,
      errorMessage: payload,
      message: '',
    };
    const state = bookmarksReducer(INITIAL_STATE, bookmarkfailureMessageAction);
    expect(state).toEqual(expectedState);
  });

  it(' Bookmark reducer should handle CREATE_SINGLE_BOOKMARK_SUCCESS', () => {
    const payload = { message: 'Bookmark has been added', bookmark: { id: 3 } };
    const CreateBookmarkSuccessMessageAction = CreateBookmarkSuccessMessage(payload);
    const expectedState = {
      ...INITIAL_STATE,
      bookmarks: [...INITIAL_STATE.bookmarks, payload.bookmark],
      loading: false,
      message: 'Bookmark has been added',
    };
    const state = bookmarksReducer(INITIAL_STATE, CreateBookmarkSuccessMessageAction);
    expect(state).toEqual(expectedState);
  });

  it(' Bookmark reducer should handle CREATE_SINGLE_BOOKMARK_ERROR', () => {
    const payload = {
      errors: 'Authentication not provided.',
    };
    const createBookmarkFailureMessage = failureMessage(payload, CREATE_SINGLE_BOOKMARK_ERROR);
    const expectedState = {
      ...INITIAL_STATE,
      errorMessage: payload,
      loading: false,
      message: '',
    };
    const state = bookmarksReducer(INITIAL_STATE, createBookmarkFailureMessage);
    expect(state).toEqual(expectedState);
  });

  it('Bookmark reducer should handle DELETE_SINGLE_BOOKMARK_ERROR', () => {
    const payload = {
      errors: 'Authentication not provided.',
    };
    const deleteBookmarkFailureMessageAction = failureMessage(
      payload,
      DELETE_SINGLE_BOOKMARK_ERROR,
    );
    const expectedState = {
      ...INITIAL_STATE,
      loading: false,
      message: '',
      errorMessage: payload,
    };
    const state = bookmarksReducer(INITIAL_STATE, deleteBookmarkFailureMessageAction);
    expect(state).toEqual(expectedState);
  });

  it('Bookmark reducer should handle DELETE_SINGLE_BOOKMARK_SUCCESS', () => {
    const payload = { message: 'Bookmark has been removed', id: 3 };
    const deleteBookmarkSuccessMessageAction = deleteBookmarkSuccessMessage(payload);
    const expectedState = {
      ...INITIAL_STATE,
      bookmarks: [{ id: 21 }],
      loading: false,
      message: 'Bookmark has been removed',
    };
    const state = bookmarksReducer(INITIAL_STATE, deleteBookmarkSuccessMessageAction);
    expect(state).toEqual(expectedState);
  });

  it('Bookmark reducer should handle AUTH_SIGNOUT', () => {
    const deleteBookmarkSuccessMessageAction = signoutAction();
    const expectedState = {
      ...INITIAL_STATE,
      bookmarks: undefined,
      loading: false,
      message: '',
      errorMessage: {},
    };
    const state = bookmarksReducer(INITIAL_STATE, deleteBookmarkSuccessMessageAction);
    expect(state).toEqual(expectedState);
  });
});
