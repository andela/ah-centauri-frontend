import { FETCH_NOTIFICATIONS } from './types';
import { api } from '../services/Api';
import { errorMessage } from './articlesActions';


export const notificationsSuccessMessage = data => ({
  type: FETCH_NOTIFICATIONS,
  payload: data,
});

export const getUserNotifications = () => dispatch => api.notifications.getUserNotifications()
  .then((response) => {
    dispatch(notificationsSuccessMessage(response.data));
  }).catch((error) => {
    dispatch(errorMessage(error.response.data));
  });

export const updateNotifications = data => dispatch => api.notifications.updateNotifications(data)
  .then((response) => {
    dispatch(notificationsSuccessMessage(response.data));
  }).catch((error) => {
    dispatch(errorMessage(error.response.data));
  });
