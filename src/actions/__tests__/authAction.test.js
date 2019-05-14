import expect from 'expect';
import * as actions from '../authActions';
import {
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_SIGNOUT,
  LOADING_PROGRESS,
} from '../types';


describe('Auth actions ', () => {
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
});
