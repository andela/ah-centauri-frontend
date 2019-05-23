import expect from 'expect';
import notificationsReducer from '../notificationsReducer';
import {
  notificationsSuccessMessage,
} from '../../actions/notificationsActions';
import { loadingMessage } from '../../actions/articlesActions';


const INITIAL_STATE = {
  notificationSettings: {},
  notifications: [],
  unreadNotifications: 0,
  errorMessage: {},
  loading: false,
};

describe('Test Notifications Reducer ', () => {
  it('should return the initial state', () => {
    const state = notificationsReducer(INITIAL_STATE, {});
    expect(state).toEqual(INITIAL_STATE);
  });

  it('should handle LOADING_PROGRESS', () => {
    const loadingMessageAction = loadingMessage();
    const expectedState = {
      ...INITIAL_STATE,
      loading: true,
    };
    const state = notificationsReducer(INITIAL_STATE, loadingMessageAction);
    expect(state).toEqual(expectedState);
  });

  it('should handle FETCH_NOTIFICATIONS', () => {
    const payload = {
      email_notifications: true,
      in_app_notifications: false,
    };

    const notificationsSuccessMessageAction = notificationsSuccessMessage(payload);
    const expectedState = {
      ...INITIAL_STATE,
      notificationSettings: {
        email_notifications: true,
        in_app_notifications: false,
      },
      loading: false,
    };
    const state = notificationsReducer(INITIAL_STATE, notificationsSuccessMessageAction);
    expect(state).toEqual(expectedState);
  });
});
