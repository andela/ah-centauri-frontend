import { api } from '../utils/Api';

export const verifyEmailAction = authData => () => api.user.verifyEmail(authData);
