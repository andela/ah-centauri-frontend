import expect from 'expect';

import {AUTH_ERROR, AUTH_SUCCESS} from '../types';
import {failureMessage, successMessage} from '../authActions';

describe('social login Actions', () => {
  it('social login success action', () => {
    const success = {
      user: {
        token: 'vV7avuaY5CCQkk7rAfN_0xGKLQHeiohpRAztD-OpE',
      },
    };
    const successAction = successMessage(success);
    const expectedAction = {
      type: AUTH_SUCCESS,
      payload: success,
    };
    expect(successAction).toEqual(expectedAction);
  });

  it('social login failure action', () => {
    const failure = { errors: 'cannot be authenticated' };
    const failureAction = failureMessage(failure);
    const expectedAction = {
      type: AUTH_ERROR,
      payload: failure.errors,
    };
    expect(failureAction).toEqual(expectedAction);
  });
});
