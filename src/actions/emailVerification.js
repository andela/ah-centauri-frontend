import { api } from '../services/Api';

export const verifyEmailAction = authData => (dispatch) => {
    api.user.verifyEmail(authData)
      .then((response) => { })
      .catch((error) => { });
  };
