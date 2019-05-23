import expect from 'expect';
import commentsReducer from '../commentsReducer';
import * as actions from '../../actions/commentsActions';


const INITIAL_STATE = {
  comments: [],
  replies: [],
  errorMessage: '',
  errorReplies: '',
  newCommentFailure: '',
  newReplyFailure: '',
  deleteCommentFailure: '',
  editCommentFailure: ''
};

describe('Test comments reducer', () => {
  it('should return the initial state', () => {
    const state = commentsReducer(INITIAL_STATE, {});
    expect(state).toEqual(INITIAL_STATE);
  });

  it('should handle fetch all comments success', () => {
    const payload = {
      comments: [{id: 25,}]
    };
    const fetchSuccessAction = actions.successMessage(payload);
    const expectedState = {
      ...INITIAL_STATE,
      comments: payload.comments
    };
    const state = commentsReducer(INITIAL_STATE, fetchSuccessAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle fetch all comments failure', () => {
    const payload = {
      errors: "something goes wrong"
    };
    const fetchErrorAction = actions.errorMessage(payload);
    const expectedState = {
      ...INITIAL_STATE,
      errorMessage: payload
    };
    const state = commentsReducer(INITIAL_STATE, fetchErrorAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle fetch all replies success', () => {
    const payload = {
      comments: [{id: 25,}]
    };
    const fetchSuccessAction = actions.successReplies(payload);
    const expectedState = {
      ...INITIAL_STATE,
      replies: payload.comments
    };
    const state = commentsReducer(INITIAL_STATE, fetchSuccessAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle fetch all replies failure', () => {
    const payload = {
      errors: "something goes wrong"
    };
    const fetchErrorAction = actions.errorReplies(payload);
    const expectedState = {
      ...INITIAL_STATE,
      errorMessage: payload
    };
    const state = commentsReducer(INITIAL_STATE, fetchErrorAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle create comment success', () => {
    const payload = {
      comment: [{id: 25,}]
    };
    const createAction = actions.createCommentSuccess(payload);
    const expectedState = {
      ...INITIAL_STATE,
      comments: [...INITIAL_STATE.comments, payload]
    };
    const state = commentsReducer(INITIAL_STATE, createAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle create comment failure', () => {
    const payload = {
      errors: "something goes wrong"
    };
    const createAction = actions.createCommentFailure(payload);
    const expectedState = {
      ...INITIAL_STATE,
      errorMessage: payload
    };
    const state = commentsReducer(INITIAL_STATE, createAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle edit comment success', () => {
    const payload = {
      comment: [{id: 25,}]
    };
    const editAction = actions.editCommentSuccess(payload);
    const expectedState = {
      ...INITIAL_STATE,
      comments: []
    };
    const state = commentsReducer(INITIAL_STATE, editAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle edit comment failure', () => {
    const payload = {
      errors: "something goes wrong"
    };
    const editAction = actions.editCommentFailure(payload);
    const expectedState = {
      ...INITIAL_STATE,
      errorMessage: payload
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
      comments: []
    };
    const state = commentsReducer(INITIAL_STATE, deleteAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle delete comment failure', () => {
    const payload = {
      errors: "something goes wrong"
    };
    const deleteErrorAction = actions.deleteCommentFailure(payload);
    const expectedState = {
      ...INITIAL_STATE,
      errorMessage: payload
    };
    const state = commentsReducer(INITIAL_STATE, deleteErrorAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle post reply failure', () => {
    const payload = {
      errors: "something goes wrong"
    };
    const postReplyFailure = actions.postReplyFailure(payload);
    const expectedState = {
      ...INITIAL_STATE,
      errorMessage: payload
    };
    const state = commentsReducer(INITIAL_STATE, postReplyFailure);
    expect(state).toEqual(expectedState);
  });
});
