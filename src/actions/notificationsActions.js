import {
  FETCH_NOTIFICATIONS,
  NOTIFICATION_LIST_UPDATED,
  FRESH_NOTIFICATIONS_LIST,
  RESET_NOTIFICATIONS_COUNT,
} from './types';
import { api } from '../services/Api';
import { errorMessage } from './articlesActions';


export const notificationsSuccessMessage = data => ({
  type: FETCH_NOTIFICATIONS,
  payload: data,
});

export const notificationsUpdated = data => ({
  type: NOTIFICATION_LIST_UPDATED,
  payload: data,
});

export const freshNotifications = data => ({
  type: FRESH_NOTIFICATIONS_LIST,
  payload: data,
});

export const resetNotificationCount = () => ({
  type: RESET_NOTIFICATIONS_COUNT,
});

export const getUserNotificationSettings = () => dispatch => api.notifications.getUserNotificationSettings()
  .then((response) => {
    dispatch(notificationsSuccessMessage(response.data));
  }).catch((error) => {
    dispatch(errorMessage(error.response.data));
  });

export const updateNotificationSettings = data => dispatch => api.notifications.updateNotificationSettings(data)
  .then((response) => {
    dispatch(notificationsSuccessMessage(response.data));
  }).catch((error) => {
    dispatch(errorMessage(error.response.data));
  });

export const updateNotificationList = page => dispatch => api.notifications.fetchNotifications(page)
  .then((response) => {
    dispatch(notificationsUpdated(response.data));
  }).catch((error) => {
    dispatch(errorMessage(error.response.data));
  });

export const getFreshNotificationList = page => dispatch => api.notifications.fetchNotifications(page)
  .then((response) => {
    dispatch(freshNotifications(response.data));
  }).catch((error) => {
    dispatch(errorMessage(error.response.data));
  });


export const notificationsMarkAsRead = () => dispatch => api.notifications.markAsRead()
  .then((response) => {
    dispatch(resetNotificationCount());
  }).catch((error) => {
    dispatch(errorMessage(error.response.data));
  });
