import {AUTH_ERROR, AUTH_SIGNOUT, AUTH_SUCCESS, LOADING_PROGRESS,} from './types';
import {api} from '../services/Api';
import getResponseErrors from '../utils/errorMessage';

export const loadingMessage = (type = LOADING_PROGRESS) => ({
  type,
});


export const failureMessage = error => ({
  type: AUTH_ERROR,
  payload: error.errors,
});

export const successMessage = (data) => {
  localStorage.setItem('AUTH_TOKEN', data.token);

  return {
    type: AUTH_SUCCESS,
    payload: data,
  };
};

export const signoutAction = () => {
  localStorage.removeItem('AUTH_TOKEN');
  return {
    type: AUTH_SIGNOUT,
  };
};

export const signUpAction = formProps => (dispatch) => {
  dispatch(loadingMessage());
  return api.user.signup(formProps)
    .then((response) => {
      dispatch(successMessage(response.data.user));
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        const { responseErrorsObject } = getResponseErrors(error.response.data);
        dispatch(failureMessage({ errors: responseErrorsObject }));
      } else {
        dispatch(failureMessage({ errors: 'Something went wrong when signing you up.' }));
      }
    });
};


export const loginAction = formProps => (dispatch) => {
  dispatch(loadingMessage());
  return api.user.login(formProps)
    .then((response) => {
      dispatch(successMessage(response.data.user));
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        const { responseErrorsObject } = getResponseErrors(error.response.data);
        dispatch(failureMessage({ errors: responseErrorsObject }));
      } else {
        dispatch(failureMessage({ errors: 'Something went wrong when signing you in.' }));
      }
    });
};
