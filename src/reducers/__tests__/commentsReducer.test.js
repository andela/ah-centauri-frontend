import expect from 'expect';
import commentsReducer, {INITIAL_STATE} from '../commentsReducer';
import * as actions from '../../actions/commentsActions';
import {loadingMessage, signoutAction} from '../../actions/authActions';
import {COMMENT_HISTORY_LOADING_PROGRESS} from '../../actions/types';


describe('Test comments reducer', () => {
  it('should return the initial state', () => {
    const state = commentsReducer(undefined, {});
    expect(state).toEqual(INITIAL_STATE);
  });

  it('should handle history loading', () => {
    const historyLoadingAction = loadingMessage(COMMENT_HISTORY_LOADING_PROGRESS);
    const expectedState = {
      ...INITIAL_STATE,
      loading: true,
    };
    const state = commentsReducer(INITIAL_STATE, historyLoadingAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle fetch edit history success', () => {

    const payload = {
      comments: [{id: 25}],
    };
    const fetchSuccessAction = actions.successEditHistory(payload);
    const expectedState = {
      ...INITIAL_STATE,
      editHistory: payload.comments,
      loading: false,
    };
    const state = commentsReducer(INITIAL_STATE, fetchSuccessAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle fetch edit history error', () => {
    const payload = {
      errors: 'something goes wrong',
    };
    const fetchFailureAction = actions.errorEditHistory(payload);
    const expectedState = {
      ...INITIAL_STATE,
      editHistory: [],
      loading: false,
    };
    const state = commentsReducer(INITIAL_STATE, fetchFailureAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle logout', () => {
    const expectedState = {
      ...INITIAL_STATE,
      editHistory: [],
      loading: false,
    };
    const state = commentsReducer(INITIAL_STATE, signoutAction());
    expect(state).toEqual(expectedState);
  });

  it('should handle fetch all comments success', () => {
    const payload = {
      comments: [{id: 25}],
    };
    const fetchSuccessAction = actions.successMessage(payload);
    const expectedState = {
      ...INITIAL_STATE,
      comments: payload.comments,
    };
    const state = commentsReducer(INITIAL_STATE, fetchSuccessAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle fetch all comments failure', () => {
    const payload = {
      errors: 'something goes wrong',
    };
    const fetchErrorAction = actions.errorMessage(payload);
    const expectedState = {
      ...INITIAL_STATE,
      errorMessage: payload,
    };
    const state = commentsReducer(INITIAL_STATE, fetchErrorAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle fetch all replies success', () => {
    const payload = {
      comments: [{id: 25}],
    };
    const fetchSuccessAction = actions.successReplies(payload);
    const expectedState = {
      ...INITIAL_STATE,
      replies: payload.comments,
    };
    const state = commentsReducer(INITIAL_STATE, fetchSuccessAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle fetch all replies failure', () => {
    const payload = {
      errors: 'something goes wrong',
    };
    const fetchErrorAction = actions.errorReplies(payload);
    const expectedState = {
      ...INITIAL_STATE,
      errorMessage: payload,
    };
    const state = commentsReducer(INITIAL_STATE, fetchErrorAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle create comment success', () => {
    const payload = {
      comment: [{id: 25}],
    };
    const createAction = actions.createCommentSuccess(payload);
    const expectedState = {
      ...INITIAL_STATE,
      comments: [...INITIAL_STATE.comments, payload],
    };
    const state = commentsReducer(INITIAL_STATE, createAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle create comment failure', () => {
    const payload = {
      errors: 'something goes wrong',
    };
    const createAction = actions.createCommentFailure(payload);
    const expectedState = {
      ...INITIAL_STATE,
      errorMessage: payload,
    };
    const state = commentsReducer(INITIAL_STATE, createAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle edit comment success', () => {
    const payload = {
      comment: [{id: 25}],
    };
    const editAction = actions.editCommentSuccess(payload);
    const expectedState = {
      ...INITIAL_STATE,
      comments: [],
    };
    const state = commentsReducer(INITIAL_STATE, editAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle edit comment failure', () => {
    const payload = {
      errors: 'something goes wrong',
    };
    const editAction = actions.editCommentFailure(payload);
    const expectedState = {
      ...INITIAL_STATE,
      errorMessage: payload,
    };
    const state = commentsReducer(INITIAL_STATE, editAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle delete comment success', () => {
    const payload = {
      id: 25,
    };
    const deleteAction = actions.deleteCommentSuccess(payload);
    const expectedState = {
      ...INITIAL_STATE,
      comments: [],
    };
    const state = commentsReducer(INITIAL_STATE, deleteAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle delete comment failure', () => {
    const payload = {
      errors: 'something goes wrong',
    };
    const deleteErrorAction = actions.deleteCommentFailure(payload);
    const expectedState = {
      ...INITIAL_STATE,
      errorMessage: payload,
    };
    const state = commentsReducer(INITIAL_STATE, deleteErrorAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle post reply failure', () => {
    const payload = {
      errors: 'something goes wrong',
    };
    const postReplyFailure = actions.postReplyFailure(payload);
    const expectedState = {
      ...INITIAL_STATE,
      errorMessage: payload,
    };
    const state = commentsReducer(INITIAL_STATE, postReplyFailure);
    expect(state).toEqual(expectedState);
  });
});
