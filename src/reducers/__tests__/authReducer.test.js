import expect from 'expect';
import reducer from '../authReducer';
import {
  failureMessage,
  loadingMessage,
  successMessage,
} from '../../actions/authActions';
import isEmpty from '../../utils/is_empty';


const INITIAL_STATE = {
  authenticated: false,
  errorMessage: {},
  successMessage: '',
  loading: false,
};

describe('Testing AUTHREDUCER', () => {
  it('should return the initial state', () => {
    const state = reducer(INITIAL_STATE, {});
    expect(state).toEqual(INITIAL_STATE);
  });

  it('should handle LOADING_PROGRESS', () => {
    const loadingAction = loadingMessage();
    const state = reducer(INITIAL_STATE, loadingAction);
    const expectedState = {
      ...INITIAL_STATE,
      loading: true,
    };
    expect(state)
      .toEqual(expectedState);
  });

  it('should handle AUTH_SUCCESS', () => {
    const payload = {
      message: 'A verification email has been sent to ah_user6@mailinator.com',
      token: 'I1NzUxfQ.TTIWoON_sn71bLKFqNFf3LbU8O8OqHeO8K0GiV5Kx00',
    };
    const authSuccessAction = successMessage(payload);
    const expectedState = {
      ...INITIAL_STATE,
      authenticated: !isEmpty(payload.token),
      successMessage: payload.message,
      errorMessage: {},
      loading: false,
    };
    const state = reducer(INITIAL_STATE, authSuccessAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle AUTH_ERROR', () => {
    const error = { errors: { username: 'Username field is required.' } };
    const authErrorAction = failureMessage(error);
    const state = reducer(INITIAL_STATE, authErrorAction);
    const expectedState = {
      ...INITIAL_STATE,
      authenticated: false,
      errorMessage: { username: 'Username field is required.' },
      loading: false,
    };
    expect(state).toEqual(expectedState);
  });
});
