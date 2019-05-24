import { RESET_PASSWORD_FAILURE, RESET_PASSWORD_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
  errorMessage: '',
  successMessage: {},
  formState: '',
};

export default function (state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        successMessage: payload,
        formState: 'success',
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        errorMessage: payload,
        formState: 'error',
      };
    default:
      return state;
  }
}
