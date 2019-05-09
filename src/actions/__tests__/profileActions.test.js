import expect from 'expect/build/index';
import {failureMessage, successMessage} from '../profileActions';
import {
  GET_MY_PROFILE_ERROR,
  GET_MY_PROFILE_SUCCESS,
  UPDATE_MY_PROFILE_ERROR,
  UPDATE_MY_PROFILE_SUCCESS,
} from '../types';
import setUpProfileTests from '../../setupTests';


describe('get current user Profile actions', () => {
  const {
    getProfileSuccessResponse, getProfileErrorResponse, updateProfileSuccessResponse, updateProfileErrorResponse,
  } = setUpProfileTests();
  it('should return an error message on failure to retrieve the user Profile', () => {
    const expectedAction = {
      type: GET_MY_PROFILE_ERROR,
      payload: getProfileErrorResponse,
    };
    expect(failureMessage(getProfileErrorResponse)).toEqual(expectedAction);
  });

  it('should return a success message on fetching of the current user\'s Profile', () => {
    const expectedAction = {
      type: GET_MY_PROFILE_SUCCESS,
      payload: getProfileSuccessResponse,
    };
    expect(successMessage(getProfileSuccessResponse)).toEqual(expectedAction);
  });

  it('should return a success message on updating of the current user\'s Profile', () => {
    const expectedAction = {
      type: UPDATE_MY_PROFILE_SUCCESS,
      payload: updateProfileSuccessResponse,
    };
    expect(successMessage(
      updateProfileSuccessResponse,
      UPDATE_MY_PROFILE_SUCCESS,
    )).toEqual(expectedAction);
  });

  it('should return a error message on updating of the current user\'s Profile', () => {
    const expectedAction = {
      type: UPDATE_MY_PROFILE_ERROR,
      payload: updateProfileErrorResponse,
    };
    expect(successMessage(
      updateProfileErrorResponse,
      UPDATE_MY_PROFILE_ERROR,
    )).toEqual(expectedAction);
  });
});
