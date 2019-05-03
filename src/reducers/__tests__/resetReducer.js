import expect from 'expect';
import resetReducer from '../resetReducer';
import { failureMessage, successMessage } from '../../actions/resetActions';


const INITIAL_STATE = {
    errorMessage: '',
    successMessage: {},
    formState: ''
};

describe('Test RESETREDUCER', () => {
    it('should return the initial state', () => {
        const state = resetReducer(INITIAL_STATE, {});
        expect(state).toEqual(INITIAL_STATE);
    });

   it('should handle get reset password link success', () => {
    const payload = {
        "message" : "success! reset password link has been sent to your email"
    };
    const resetSuccessAction = successMessage(payload);
    const expectedState = {
      ...INITIAL_STATE,
      successMessage: resetSuccessAction.payload,
      formState: 'success'
    };
    const state = resetReducer(INITIAL_STATE, resetSuccessAction);
    expect(state).toEqual(expectedState);
    });

    it('should handle get reset password link error', () => {
        const payload = {
           "errors" : "failed! email is invalid"
        };
        const resetFailureAction = failureMessage(payload);
        const expectedState = {
          ...INITIAL_STATE,
          errorMessage: resetFailureAction.payload,
          formState: 'error'
        };
        const state = resetReducer(INITIAL_STATE, resetFailureAction);
        expect(state).toEqual(expectedState);
  });
});