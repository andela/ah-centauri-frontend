import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { API_HOST } from '../../services/Api';
import * as actions from '../notificationsActions';
import { errorMessage } from '../articlesActions';
import { FRESH_NOTIFICATIONS_LIST } from '../types';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore();

describe('Notifications actions ', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });

  it('test it creates FETCH_NOTIFICATIONS when authenticated', async (done) => {
    const data = {
      token: 'token',
      message: 'Success!',
    };

    const expectedActions = actions.notificationsSuccessMessage(data);

    moxios.stubRequest(`${API_HOST}/notification/settings`, {
      status: 200,
      response: {
        token: 'token',
        message: 'Success!',
      },
    });

    await store.dispatch(actions.getUserNotificationSettings());
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });

  it('test it creates ERROR_FETCHING_ARTICLES when authenticated', async (done) => {
    const data = {
      token: 'token',
      message: 'Success!',
    };

    const expectedActions = errorMessage(data);

    moxios.stubRequest(`${API_HOST}/notification/settings`, {
      status: 404,
      response: {
        token: 'token',
        message: 'Success!',
      },
    });

    await store.dispatch(actions.getUserNotificationSettings());
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });

  it('test it creates FETCH_NOTIFICATIONS when authenticated', async (done) => {
    const data = {
      token: 'token',
      message: 'Success!',
    };

    const expectedActions = actions.notificationsSuccessMessage(data);

    moxios.stubRequest(`${API_HOST}/notification/settings`, {
      status: 200,
      response: {
        token: 'token',
        message: 'Success!',
      },
    });

    await store.dispatch(actions.updateNotificationSettings());
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });

  it('test it creates updateNotificationSettings when authenticated', async (done) => {
    const data = {
      token: 'token',
      message: 'Success!',
    };

    const expectedActions = errorMessage(data);

    moxios.stubRequest(`${API_HOST}/notification/settings`, {
      status: 404,
      response: {
        token: 'token',
        message: 'Success!',
      },
    });

    await store.dispatch(actions.updateNotificationSettings());
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });

  it('test it creates NOTIFICATION_LIST_UPDATED when notifications fetched', async (done) => {
    const data = {
      results: [1, 2, 3],
      loading: false,
      unreadNotifications: 0,
      nextPage: '',
      previousPage: '',
    };

    const expectedActions = actions.notificationsUpdated(data);

    moxios.stubRequest(`${API_HOST}/me/notifications?page=1`, {
      status: 200,
      response: data,
    });

    await store.dispatch(actions.updateNotificationList(1));
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });

  it('test it creates FRESH_NOTIFICATIONS_LIST when fresh list of notifications fetched', async (done) => {
    const data = {
      results: [1, 2, 3],
      loading: false,
      unreadNotifications: 0,
      nextPage: '',
      previousPage: '',
    };

    const expectedActions = actions.freshNotifications(data);

    moxios.stubRequest(`${API_HOST}/me/notifications?page=1`, {
      status: 200,
      response: data,
    });

    await store.dispatch(actions.getFreshNotificationList(1));
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });

  it('test it creates RESET_NOTIFICATIONS_COUNT when notifications are marked as read', async (done) => {
    const data = {
      unreadNotifications: 0,
    };

    const expectedActions = actions.resetNotificationCount();

    moxios.stubRequest(`${API_HOST}/me/notifications`, {
      status: 200,
      response: data,
    });

    await store.dispatch(actions.notificationsMarkAsRead());
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });
});
