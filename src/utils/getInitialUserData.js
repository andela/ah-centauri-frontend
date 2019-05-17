import {api} from '../services/Api';
import getResponseErrors from './errorMessage';
import {failureMessage, successMessage} from '../actions/profileActions';


const fetchInitialUserData = (store) => {
  const { dispatch } = store;
  api.profile.getMyProfile()
    .then((response) => {
      dispatch(successMessage(response.data));
    })
    .catch((error) => {
      if (error.response && error.response.data) {
        const { responseErrorsObject } = getResponseErrors(error.response.data);
        dispatch(failureMessage(responseErrorsObject));
      } else {
        dispatch(failureMessage({ errors: 'Something went wrong when fetching your profile.' }));
      }
    });
};

export default async (store) => {
  if (localStorage.getItem('AUTH_TOKEN')) {
    await fetchInitialUserData(store);
  }
};
