import {
  AUTH_ERROR,
  AUTH_SUCCESS,
  AUTH_SIGNOUT,
  LOADING_PROGRESS,
} from './types';
import { api } from '../utils/Api';

export const loadingMessage = () => ({
  type: LOADING_PROGRESS,
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
  api.user.signup(formProps)
    .then((response) => {
      dispatch(successMessage(response.data.user));
    })
    .catch((error) => {
      dispatch(failureMessage(error.response.data));
    });
};


export const loginAction = formProps => (dispatch) => {
  dispatch(loadingMessage());
  api.user.login(formProps)
    .then((response) => {
      dispatch(successMessage(response.data.user));
    })
    .catch((error) => {
      dispatch(failureMessage(error.response.data));
    });
};
