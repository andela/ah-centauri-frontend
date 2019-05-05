import expect from 'expect/build/index';
import {failureMessage, successMessage} from '../profileActions';
import {GET_MY_PROFILE_ERROR, GET_MY_PROFILE_SUCCESS} from '../types';
import setUpProfileTests from '../../setupTests';


describe('get current user Profile actions', () => {
  const { getProfileSuccessResponse, getProfileErrorResponse } = setUpProfileTests();
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
});
