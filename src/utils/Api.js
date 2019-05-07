import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const api = {
  user: {
    signup: data => axios.post('users/', data),
    login: data => axios.post('users/login/', data),
  },
};
