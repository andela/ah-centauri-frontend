import {
  FETCH_NOTIFICATIONS,
  FRESH_NOTIFICATIONS_LIST,
  NOTIFICATION_LIST_UPDATED,
  NOTIFICATIONS_LOADING_PROGRESS,
  RESET_NOTIFICATIONS_COUNT,
} from '../actions/types';

const INITIAL_STATE = {
  notificationSettings: {},
  notifications: [],
  unreadNotifications: 0,
  errorMessage: {},
  loading: false,
  nextPage: '',
  previousPage: '',
};

export default function (state = INITIAL_STATE, actions) {
  switch (actions.type) {
    case NOTIFICATIONS_LOADING_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case RESET_NOTIFICATIONS_COUNT:
      return {
        ...state,
        unreadNotifications: 0,
      };
    case FETCH_NOTIFICATIONS:
      return {
        ...state,
        notificationSettings: {
          email_notifications: actions.payload.email_notifications,
          in_app_notifications: actions.payload.in_app_notifications,
        },
        loading: false,
        nextPage: actions.payload.next,
        previousPage: actions.payload.previousPage,
      };
    case FRESH_NOTIFICATIONS_LIST:
      return {
        ...state,
        loading: false,
        notifications: actions.payload.results,
        unreadNotifications: actions.payload.results.filter(n => !n.is_read).length,
        nextPage: actions.payload.next,
        previousPage: actions.payload.previousPage,
      };
    case NOTIFICATION_LIST_UPDATED:
      return {
        ...state,
        loading: false,
        notifications: [...actions.payload.results, ...state.notifications],
        unreadNotifications: actions.payload.results.filter(n => !n.is_read).length,
        nextPage: actions.payload.next,
        previousPage: actions.payload.previousPage,
      };
    default:
      return state;
  }
}
