// eslint-disable-next-line import/no-extraneous-dependencies
import expect from 'expect';
import * as actions from './authActions';
import * as types from './types';


describe('actions', () => {
  it('should return an error message on failure', () => {
    const error = { errors: { username: 'Username field is required.' } };
    const expectedAction = {
      type: types.AUTH_ERROR,
      payload: error,
    };
    expect(actions.failureMessage(error)).toEqual(expectedAction);
  });

  it('should return an error message on success', () => {
    const payload = {
      message: 'success!',
      user: {
        token: 'I1NzUxfQ.TTIWoON_sn71bLKFqNFf3LbU8O8OqHeO8K0GiV5Kx00',
        message: 'A verification email has been sent to ah_user6@mailinator.com',
        data: {
          email: 'ah_user6@mailinator.com',
          username: 'ah_user6',
        },
      },
    };
    const expectedAction = {
      type: types.AUTH_SUCCESS,
      payload: payload.user,
    };
    expect(actions.successMessage(payload)).toEqual(expectedAction);
    expect(payload.user.token).toEqual(localStorage.getItem('AUTH_TOKEN'));
  });
});
