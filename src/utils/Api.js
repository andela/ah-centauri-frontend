import axios from 'axios';

// Backend API URL
const API_HOST = 'https://ah-centauri-backend-staging.herokuapp.com/api';
// eslint-disable-next-line import/prefer-default-export

export const api = {
  user: {
    signup: data => axios.post(`${API_HOST}/users/`, data),
    login: data => axios.post(`${API_HOST}/users/login/`, data),
    resetPasswordLink: data => axios.post(`${API_HOST}/users/password_reset/`, data),
    resetPassword: data => axios.patch(`${API_HOST}/users/password_reset/${data.token}/`, data.resetData),
    verifyEmail: data => axios.get(`${API_HOST}/verify-email/${data.token}/${data.uid}/`),
  },
  profile: {
    getMyProfile: () => axios.get('/profiles/me/'),
    updateMyProfile: data => axios.patch('/user/', data),
  },
};
