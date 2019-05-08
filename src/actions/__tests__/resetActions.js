import expect from 'expect';

import { RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE } from '../types';
import { successMessage, failureMessage } from '../resetActions';

describe('Reset Actions', () => {
    it('should handle success action', () => {
        const success = { "message" : "successfully reset password!"};
        const successAction = successMessage(success);
        const expectedAction = {
            type: RESET_PASSWORD_SUCCESS,
            payload: success
        };
        expect(successAction).toEqual(expectedAction);

    });

    it('should handle failure action', () => {
        const failure = {'errors' : "password is required"};
        const failureAction = failureMessage(failure);
        const expectedAction = {
            type: RESET_PASSWORD_FAILURE,
            payload: failure
        };
        expect(failureAction).toEqual(expectedAction);
    });
});