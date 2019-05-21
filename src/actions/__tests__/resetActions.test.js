import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {API_HOST} from '../../services/Api';
import {RESET_PASSWORD_FAILURE, RESET_PASSWORD_SUCCESS} from '../types';
import * as actions from '../resetActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const store = mockStore();

describe('Reset Actions', () => {
  it('should handle success action', () => {
    const success = { message: 'successfully reset password!' };
    const successAction = actions.successMessage(success);
    const expectedAction = {
      type: RESET_PASSWORD_SUCCESS,
      payload: success,
    };
    expect(successAction).toEqual(expectedAction);
  });

  it('should handle failure action', () => {
    const failure = { errors: 'password is required' };
    const failureAction = actions.failureMessage(failure);
    const expectedAction = {
      type: RESET_PASSWORD_FAILURE,
      payload: failure,
    };
    expect(failureAction).toEqual(expectedAction);
  });
});

describe('Test reset password axios actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const data = {
    resetData: 'phkkh',
    token: 1234546,
  };

  it('creates RESET_PASSWORD_SUCCESS when get reset password link is successful', async (done) => {
    const message = {
      message: 'A password reset link has been sent to your email. Please follow the link to complete the password reset',
    };

    const expectedActions = actions.successMessage(message);

    moxios.stubRequest(`${API_HOST}/users/password_reset/`, {
      status: 202,
      response: {
        message: 'A password reset link has been sent to your email. Please follow the link to complete the password reset',
      },
    });

    await store.dispatch(actions.resetPasswordLinkService({}));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });

  it('creates RESET_PASSWORD_FAILURE when get reset password link is unsuccessful', async (done) => {
    const message = 'invalid email';

    const expectedActions = actions.failureMessage(message);

    moxios.stubRequest(`${API_HOST}/users/password_reset/`, {
      status: 400,
      response: {
        errors: {
          email: ['invalid email'],
        },
      },
    });

    await store.dispatch(actions.resetPasswordLinkService({}));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });

  it('creates RESET_PASSWORD_FAILURE when get reset password link fails', async (done) => {
    const message = 'error error';

    const expectedActions = actions.failureMessage(message);

    moxios.stubRequest(`${API_HOST}/users/password_reset/`, {
      status: 400,
      response: {
        errors: 'error error',
      },
    });

    await store.dispatch(actions.resetPasswordLinkService({}));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });

  it('creates RESET_PASSWORD_SUCCESS when reset password is successful', async (done) => {
    const message = {
      message: 'password has been reset',
    };

    const expectedActions = actions.successMessage(message);

    moxios.stubRequest(`${API_HOST}/users/password_reset/${data.token}/`, {
      status: 200,
      response: {
        message: 'password has been reset',
      },
    });

    await store.dispatch(actions.resetPasswordService({ data }));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });

  it('creates RESET_PASSWORD_FAILURE when reset password is unsuccessful', async (done) => {
    const message = 'passwords do not match';

    const expectedActions = actions.failureMessage(message);

    moxios.stubRequest(`${API_HOST}/users/password_reset/${data.token}/`, {
      status: 400,
      response: {
        errors: {
          password: ['passwords do not match'],
        },
      },
    });

    await store.dispatch(actions.resetPasswordService({ data }));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });

  it('creates RESET_PASSWORD_FAILURE when reset password fails', async (done) => {
    const message = 'error error';

    const expectedActions = actions.failureMessage(message);

    moxios.stubRequest(`${API_HOST}/users/password_reset/${data.token}/`, {
      status: 400,
      response: {
        errors: 'error error',
      },
    });

    await store.dispatch(actions.resetPasswordService({ data }));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });
});
