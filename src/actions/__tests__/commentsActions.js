import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { API_HOST } from '../../services/Api';
import {
  ERROR_FETCHING_COMMENTS,
  FETCH_ALL_COMMENTS,
  ERROR_FETCHING_REPLIES,
  FETCH_ALL_REPLIES,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  EDIT_COMMENT_SUCCESS,
  POST_REPLY_FAILURE,
} from '../types';
import * as actions from '../commentsActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const store = mockStore();

describe('Reset Actions', () => {
  it('should handle fetch all comments successfully', () => {
    const payload = {
      comments: [
        {
          id: 25,
        },
      ],
    };
    const successAction = actions.successMessage(payload);
    const expectedAction = {
      type: FETCH_ALL_COMMENTS,
      payload,
    };
    expect(successAction).toEqual(expectedAction);
  });

  it('should handle fetch all comments failure action', () => {
    const failure = { errors: 'something goes wrong' };
    const failureAction = actions.errorMessage(failure);
    const expectedAction = {
      type: ERROR_FETCHING_COMMENTS,
      payload: failure,
    };
    expect(failureAction).toEqual(expectedAction);
  });

  it('should handle fetch all replies successfully', () => {
    const payload = {
      comments: [
        {
          id: 25,
          article: 'reset',
          author: 'valerie',
          body: 'edit',
          created_at: '2019-05-23T07:34:23.008229Z',
          updated_at: '2019-05-23T07:34:32.858240Z',
          replies: 0,
          parent: null,
          likes: 0,
          dislikes: 0,
          has_edits: true,
        },
      ],
    };
    const successAction = actions.successReplies(payload);
    const expectedAction = {
      type: FETCH_ALL_REPLIES,
      payload,
    };
    expect(successAction).toEqual(expectedAction);
  });

  it('should handle fetch all replies failure action', () => {
    const failure = { errors: 'something goes wrong' };
    const failureAction = actions.errorReplies(failure);
    const expectedAction = {
      type: ERROR_FETCHING_REPLIES,
      payload: failure,
    };
    expect(failureAction).toEqual(expectedAction);
  });

  it('should handle create comment successfully', () => {
    const payload = {
      id: 25,
      article: 'reset',
      author: 'valerie',
      body: 'edit',
      created_at: '2019-05-23T07:34:23.008229Z',
      updated_at: '2019-05-23T07:34:32.858240Z',
      replies: 0,
      parent: null,
      likes: 0,
      dislikes: 0,
      has_edits: true,
    };
    const successAction = actions.createCommentSuccess(payload);
    const expectedAction = {
      type: CREATE_COMMENT_SUCCESS,
      payload,
    };
    expect(successAction).toEqual(expectedAction);
  });

  it('should handle create comment failure action', () => {
    const failure = { errors: 'something goes wrong' };
    const failureAction = actions.createCommentFailure(failure);
    const expectedAction = {
      type: CREATE_COMMENT_FAILURE,
      payload: failure,
    };
    expect(failureAction).toEqual(expectedAction);
  });

  it('should handle edit comment success', () => {
    const payload = {
      id: 25,
      article: 'reset',
      author: 'valerie',
      body: 'edit',
      created_at: '2019-05-23T07:34:23.008229Z',
      updated_at: '2019-05-23T07:34:32.858240Z',
      replies: 0,
      parent: null,
      likes: 0,
      dislikes: 0,
      has_edits: true,
    };
    const successAction = actions.editCommentSuccess(payload);
    const expectedAction = {
      type: EDIT_COMMENT_SUCCESS,
      payload,
    };
    expect(successAction).toEqual(expectedAction);
  });

  it('should handle edit comment failure action', () => {
    const failure = { errors: 'something goes wrong' };
    const failureAction = actions.editCommentFailure(failure);
    const expectedAction = {
      type: EDIT_COMMENT_FAILURE,
      payload: failure,
    };
    expect(failureAction).toEqual(expectedAction);
  });

  it('should handle delete comment success', () => {
    const payload = {
      id: 25,
    };
    const successAction = actions.deleteCommentSuccess(payload);
    const expectedAction = {
      type: DELETE_COMMENT_SUCCESS,
      payload,
    };
    expect(successAction).toEqual(expectedAction);
  });

  it('should handle delete comment failure action', () => {
    const failure = { errors: 'something goes wrong' };
    const failureAction = actions.deleteCommentFailure(failure);
    const expectedAction = {
      type: DELETE_COMMENT_FAILURE,
      payload: failure,
    };
    expect(failureAction).toEqual(expectedAction);
  });

  it('should handle post reply failure action', () => {
    const failure = { errors: 'something goes wrong' };
    const failureAction = actions.postReplyFailure(failure);
    const expectedAction = {
      type: POST_REPLY_FAILURE,
      payload: failure,
    };
    expect(failureAction).toEqual(expectedAction);
  });
});

describe('Test commenting axios actions', () => {
  beforeEach(() => {
    moxios.install();
  });
  
  afterEach(() => {
    moxios.uninstall();
  });
  
  const slug = 'path';
  const data = {
    slug: 'path',
    parent_id: 12,
  };
  const createCommentData = {
    slug: 'path',
    payload: {},
  };
  const deleteData = {
    slug: 'path',
    comment_id: 12,
  };
  const editData = {
    slug: 'path',
    comment_id: 12,
    payload: {},
  };
  const postReplyData = {
    slug: 'path',
    payload: {
      comment: {},
    },
  };
  
  it('creates FETCH_ALL_COMMENTS when fetch all comments is successful', async (done) => {
    const payload = {
      comments: [{id: 25}],
    };
    
    const expectedActions = actions.successMessage(payload);
    
    moxios.stubRequest(`${API_HOST}/articles/${slug}/comments/`, {
      status: 200,
      response: {
        comments: [{id: 25}],
      },
    });
    
    await store.dispatch(actions.getAllComments(slug));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });
  
  it('creates ERROR_FETCHING_COMMENTS when fetch all comments is unsuccessful', async (done) => {
    const payload = {
      errors: 'something goes wrong',
    };
    
    const expectedActions = actions.errorMessage(payload);
    
    moxios.stubRequest(`${API_HOST}/articles/${slug}/comments/`, {
      status: 400,
      response: {
        errors: 'something goes wrong',
      },
    });
    
    await store.dispatch(actions.getAllComments(slug));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });
  
  it('creates FETCH_ALL_REPLIES when fetch all replies is successful', async (done) => {
    const payload = {
      comments: [{id: 25}],
    };
    
    const expectedActions = actions.successReplies(payload);
    
    moxios.stubRequest(`${API_HOST}/articles/${data.slug}/comments/?parent=${data.parent_id}`, {
      status: 200,
      response: {
        comments: [{id: 25}],
      },
    });
    
    await store.dispatch(actions.getAllReplies(data));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });
  
  it('creates ERROR_FETCHING_REPLIES when fetch all replies is unsuccessful', async (done) => {
    const payload = {
      errors: 'something goes wrong',
    };
    
    const expectedActions = actions.errorReplies(payload);
    
    moxios.stubRequest(`${API_HOST}/articles/${data.slug}/comments/?parent=${data.parent_id}`, {
      status: 400,
      response: {
        errors: 'something goes wrong',
      },
    });
    
    await store.dispatch(actions.getAllReplies(data));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });
  
  it('creates CREATE_COMMENT_SUCCESS when create comment is successful', async (done) => {
    const payload = {
      comment: [{id: 25}],
    };
    
    const expectedActions = actions.createCommentSuccess(payload.comment);
    
    moxios.stubRequest(`${API_HOST}/articles/${createCommentData.slug}/comments/`, {
      status: 200,
      response: {
        comment: [{id: 25}],
      },
    });
    
    await store.dispatch(actions.createComment(createCommentData));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });
  
  it('creates CREATE_COMMENT_FAILURE when create comment is unsuccessful', async (done) => {
    const payload = {
      errors: 'something goes wrong',
    };
    
    const expectedActions = actions.createCommentFailure(payload);
    
    moxios.stubRequest(`${API_HOST}/articles/${createCommentData.slug}/comments/`, {
      status: 400,
      response: {
        errors: 'something goes wrong',
      },
    });
    
    await store.dispatch(actions.createComment(createCommentData));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });
  
  it('creates EDIT_COMMENT_SUCCESS when edit comment is successful', async (done) => {
    const payload = {
      comment: [{id: 25}],
    };
    
    const expectedActions = actions.editCommentSuccess(payload.comment);
    
    moxios.stubRequest(`${API_HOST}/articles/${editData.slug}/comments/${editData.comment_id}/`, {
      status: 200,
      response: {
        comment: [{id: 25}],
      },
    });
    
    await store.dispatch(actions.editComment(editData));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });
  
  it('creates EDIT_COMMENT_FAILURE when create comment is unsuccessful', async (done) => {
    const payload = {
      errors: 'something goes wrong',
    };
    
    const expectedActions = actions.editCommentFailure(payload);
    
    moxios.stubRequest(`${API_HOST}/articles/${editData.slug}/comments/${editData.comment_id}/`, {
      status: 400,
      response: {
        errors: 'something goes wrong',
      },
    });
    
    await store.dispatch(actions.editComment(editData));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });
  
  it('creates DELETE_COMMENT_SUCCESS when delete comment is successful', async (done) => {
    const expectedActions = actions.deleteCommentSuccess(deleteData.comment_id);
    
    moxios.stubRequest(`${API_HOST}/articles/${deleteData.slug}/comments/${deleteData.comment_id}/`, {
      status: 200,
      response: {
        message: 'success',
      },
    });
    
    await store.dispatch(actions.deleteComment(deleteData));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });
  
  it('creates DELETE_COMMENT_FAILURE when delete comment is unsuccessful', async (done) => {
    const payload = {
      errors: 'something goes wrong',
    };
    const expectedActions = actions.deleteCommentFailure(payload);
    
    moxios.stubRequest(`${API_HOST}/articles/${deleteData.slug}/comments/${deleteData.comment_id}/`, {
      status: 400,
      response: {
        errors: 'something goes wrong',
      },
    });
    
    await store.dispatch(actions.deleteComment(deleteData));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });
  
  it('creates FETCH_ALL_COMMENTS when post reply is successful', async (done) => {
    const payload = {
      comments: [{id: 25}],
    };
    
    const expectedActions = actions.successMessage(payload);
    
    moxios.stubRequest(`${API_HOST}/articles/${postReplyData.slug}/comments/`, {
      status: 200,
      response: {
        message: 'success',
      },
    });
    
    await store.dispatch(actions.postReply(postReplyData));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });
  
  it('creates POST_REPLY_FAILURE when post reply is unsuccessful', async (done) => {
    const payload = {
      errors: 'something goes wrong',
    };
    
    const expectedActions = actions.postReplyFailure(payload);
    
    moxios.stubRequest(`${API_HOST}/articles/${postReplyData.slug}/comments/`, {
      status: 400,
      response: {
        errors: 'something goes wrong',
      },
    });
    
    await store.dispatch(actions.postReply(postReplyData));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });
});
