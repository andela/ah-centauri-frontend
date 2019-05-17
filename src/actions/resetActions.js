import {
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS
} from './types';
import { api } from '../services/Api';

export const failureMessage = error => {
  return {
    type: RESET_PASSWORD_FAILURE,
    payload: error,
  }
};

export const successMessage = message => {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: message,
  };
};

export const resetPasswordLinkService = ({ email }) => (dispatch) => {
  return api.user.resetPasswordLink(email)
    .then((response) => {
      dispatch(successMessage(response.data));
    })
    .catch((error) => {
      const payload = error.response.data.errors;
      if (typeof payload === 'string') {
        dispatch(failureMessage(payload));
      } else {
        dispatch(failureMessage(payload.email[0]));
      }
    });
};

export const resetPasswordService = ({ data }) => (dispatch) => {
  return api.user.resetPassword(data)
    .then((response) => {
      dispatch(successMessage(response.data));
    })
    .catch((error) => {
      const payload = error.response.data.errors;
      if (typeof payload === 'string') {
        dispatch(failureMessage(payload));
      } else {
        dispatch(failureMessage(payload.password[0]));
      }
    });
};
