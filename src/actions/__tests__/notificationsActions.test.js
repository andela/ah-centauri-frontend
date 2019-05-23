import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { API_HOST } from '../../services/Api';
import * as actions from '../notificationsActions';
import { errorMessage } from '../articlesActions';

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

    await store.dispatch(actions.getUserNotifications());
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

    await store.dispatch(actions.getUserNotifications());
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

    await store.dispatch(actions.updateNotifications());
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });

  it('test it creates updateNotifications when authenticated', async (done) => {
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

    await store.dispatch(actions.updateNotifications());
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });
});
