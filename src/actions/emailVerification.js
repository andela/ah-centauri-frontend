import { api } from '../services/Api';

export const verifyEmailAction = authData => () => api.user.verifyEmail(authData);
