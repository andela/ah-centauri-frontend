import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {API_HOST} from '../../services/Api';
import * as actions from '../authActions';
import {AUTH_ERROR, AUTH_SIGNOUT, AUTH_SUCCESS, LOADING_PROGRESS,} from '../types';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore();

describe('Auth actions ', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });

  it('render loading message action', () => {
    const loadingAction = actions.loadingMessage();
    const expectedAction = {
      type: LOADING_PROGRESS,
    };
    expect(loadingAction)
      .toEqual(expectedAction);
  });

  it('should failureMessage action', () => {
    const error = { errors: { username: 'Username field is required.' } };
    const failureAction = actions.failureMessage(error);
    const expectedAction = {
      type: AUTH_ERROR,
      payload: error.errors,
    };
    expect(failureAction).toEqual(expectedAction);
  });

  it('should handle successMessage action', () => {
    const payload = {
      token: 'I1NzUxfQ.TTIWoON_sn71bLKFqNFf3LbU8O8OqHeO8K0GiV5Kx00',
      message: 'A verification email has been sent to ah_user6@mailinator.com',
    };
    const expectedAction = {
      type: AUTH_SUCCESS,
      payload,
    };
    const successAction = actions.successMessage(payload);
    expect(successAction).toEqual(expectedAction);
    expect(payload.token)
      .toEqual(localStorage.getItem('AUTH_TOKEN'));
  });

  it('render signout action', () => {
    const signoutAction = actions.signoutAction();
    const expectedAction = {
      type: AUTH_SIGNOUT,
    };

    expect(signoutAction)
      .toEqual(expectedAction);
  });

  it('test it creates AUTH_SUCCESS when login successful', async (done) => {
    const data = {
      token: 'token',
      message: 'Success!',
    };

    const expectedActions = actions.successMessage(data);

    moxios.stubRequest(`${API_HOST}/users/login/`, {
      status: 200,
      response: {
        user: {
          token: 'token',
          message: 'Success!',
        },
      },
    });

    await store.dispatch(actions.loginAction());
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });

  it('test it creates AUTH_ERROR when login fails', async (done) => {
    const data = {
      errors: {
        errors: 'found something wrong',
      },
    };

    const expectedActions = actions.failureMessage(data);

    moxios.stubRequest(`${API_HOST}/users/login/`, {
      status: 400,
      response: {
        errors: [
          'found something wrong',
        ],
      },
    });

    await store.dispatch(actions.loginAction());
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });

  it('test it creates AUTH_SUCCESS when registration successful', async (done) => {
    const data = {
      token: 'token',
      message: 'Success!',
    };

    const expectedActions = actions.successMessage(data);

    moxios.stubRequest(`${API_HOST}/users/`, {
      status: 200,
      response: {
        user: {
          token: 'token',
          message: 'Success!',
        },
      },
    });

    await store.dispatch(actions.signUpAction());
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });

  it('test it creates AUTH_ERROR when registration fails', async (done) => {
    const data = {
      errors: {
        errors: 'found something wrong',
      },
    };

    const expectedActions = actions.failureMessage(data);

    moxios.stubRequest(`${API_HOST}/users/`, {
      status: 400,
      response: {
        errors: [
          'found something wrong',
        ],
      },
    });

    await store.dispatch(actions.signUpAction());
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });
});
