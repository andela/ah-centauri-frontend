import reducer from './authReducer';
import * as types from '../actions/types';

describe('authReducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        authenticated: false,
        user: {},
        errorMessage: {},
      },
    );
  });

  it('should handle AUTH_SUCCESS', () => {
    expect(reducer({}, {
      type: types.AUTH_SUCCESS,
      payload: {
        email: 'ah_user6@mailinator.com',
        username: 'ah_user6',
      },
    })).toEqual({
      authenticated: true,
      user: {
        email: 'ah_user6@mailinator.com',
        username: 'ah_user6',
      },
    });
  });

  it('should handle AUTH_ERROR', () => {
    expect(reducer({}, {
      type: types.AUTH_ERROR,
      payload: { errors: { username: 'Username field is required.' } },
    })).toEqual({
      authenticated: false,
      errorMessage: { errors: { username: 'Username field is required.' } },
    });
  });
});
