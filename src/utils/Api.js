import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const api = {
  user: {
    signup: data => axios.post('users/', data),
    login: data => axios.post('users/login/', data),
    resetPasswordLink: data => axios.post('users/password_reset/', data),
    resetPassword: data => axios.patch(`/users/password_reset/${data.token}/`, data.resetData),
  },
};

