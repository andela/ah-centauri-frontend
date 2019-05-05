import {api} from '../utils/Api';
import {
  GET_MY_PROFILE_ERROR,
  GET_MY_PROFILE_SUCCESS,
  UPDATE_MY_PROFILE_ERROR,
  UPDATE_MY_PROFILE_SUCCESS
} from './types';
import {loadingMessage} from './authActions';

export function successMessage(responseData, type = GET_MY_PROFILE_SUCCESS) {
  return { type, payload: responseData };
}

export function failureMessage(error, type = GET_MY_PROFILE_ERROR) {
  return { type, payload: error };
}

export const getMyProfileAction = () => (dispatch) => {
  dispatch(loadingMessage());
  api.profile.getMyProfile()
    .then((response) => {
      dispatch(successMessage(response.data));
    })
    .catch((error) => {
      dispatch(failureMessage(error.response.data));
    });
};

export const updateMyProfileAction = profileFormData => (dispatch) => {
  dispatch(loadingMessage());
  api.profile.updateMyProfile(profileFormData)
    .then((response) => {
      dispatch(successMessage(response.data, UPDATE_MY_PROFILE_SUCCESS));
    })
    .catch((error) => {
      dispatch(failureMessage(error.response.data, UPDATE_MY_PROFILE_ERROR));
    });
};
