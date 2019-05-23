import expect from 'expect/build/index';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import { API_HOST } from '../../services/Api';
import {
  failureMessage,
  getMyProfileAction,
  successMessage,
  updateMyProfileAction,
  getSingleUserProfileAction,
} from '../profileActions';
import {
  GET_MY_PROFILE_ERROR,
  GET_MY_PROFILE_SUCCESS,
  GET_SINGLE_PROFILE_SUCCESS,
  UPDATE_MY_PROFILE_ERROR,
  UPDATE_MY_PROFILE_SUCCESS,
} from '../types';
import setUpProfileTests from '../../setupTests';
import { errorMessage } from '../articlesActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore();
const {
  getProfileSuccessResponse,
  getProfileErrorResponse,
  updateProfileSuccessResponse,
  updateProfileErrorResponse,
} = setUpProfileTests();


describe('get current user Profile actions', () => {
  it('should return an error message on failure to retrieve the user Profile', () => {
    const expectedAction = {
      type: GET_MY_PROFILE_ERROR,
      payload: getProfileErrorResponse,
    };
    expect(failureMessage(getProfileErrorResponse)).toEqual(expectedAction);
  });

  it('should return a success message on fetching of the current user\'s Profile', () => {
    const expectedAction = {
      type: GET_MY_PROFILE_SUCCESS,
      payload: getProfileSuccessResponse,
    };
    expect(successMessage(getProfileSuccessResponse)).toEqual(expectedAction);
  });

  it('should return a success message on updating of the current user\'s Profile', () => {
    const expectedAction = {
      type: UPDATE_MY_PROFILE_SUCCESS,
      payload: updateProfileSuccessResponse,
    };
    expect(successMessage(
      updateProfileSuccessResponse,
      UPDATE_MY_PROFILE_SUCCESS,
    )).toEqual(expectedAction);
  });

  it('should return a error message on updating of the current user\'s Profile', () => {
    const expectedAction = {
      type: UPDATE_MY_PROFILE_ERROR,
      payload: updateProfileErrorResponse,
    };
    expect(successMessage(
      updateProfileErrorResponse,
      UPDATE_MY_PROFILE_ERROR,
    )).toEqual(expectedAction);
  });
});

describe('Test getMyProfileAction async action creators', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });

  it('tests getMyProfileAction success', async (done) => {
    moxios.stubRequest(`${API_HOST}/profiles/me/`, {
      status: 200,
      response: getProfileSuccessResponse,
    });

    await store.dispatch(getMyProfileAction());
    expect(store.getActions()).toContainEqual(
      successMessage(getProfileSuccessResponse),
    );
    done();
  });
  it('tests getMyProfileAction failure', async (done) => {
    moxios.stubRequest(`${API_HOST}/profiles/me/`, {
      status: 403,
      response: getProfileErrorResponse,
    });

    await store.dispatch(getMyProfileAction());
    expect(store.getActions()).toContainEqual(
      failureMessage(getProfileErrorResponse.errors),
    );
    done();
  });

  it('tests getMyProfileAction failure on empty error object', async (done) => {
    moxios.stubRequest(`${API_HOST}/profiles/me/`, {
      status: 500,
      response: undefined,
    });

    await store.dispatch(getMyProfileAction());
    expect(store.getActions()).toContainEqual(
      failureMessage({ errors: 'Something went wrong when fetching your profile.' }),
    );
    done();
  });
});

describe('Test updateMyProfileAction async action creators', () => {
  const updateProfileData = { phone: '705093952' };
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });

  it('tests updateMyProfileAction success', async (done) => {
    moxios.stubRequest(`${API_HOST}/user/`, {
      status: 200,
      response: updateProfileSuccessResponse,
    });

    await store.dispatch(updateMyProfileAction(updateProfileData));
    expect(store.getActions()).toContainEqual(
      successMessage(updateProfileSuccessResponse, UPDATE_MY_PROFILE_SUCCESS),
    );
    done();
  });

  it('tests updateMyProfileAction failure', async (done) => {
    moxios.stubRequest(`${API_HOST}/user/`, {
      status: 403,
      response: updateProfileErrorResponse,
    });

    await store.dispatch(updateMyProfileAction(updateProfileData));
    expect(store.getActions()).toContainEqual(
      failureMessage({ phone: updateProfileErrorResponse.errors.profile.phone[0] },
        UPDATE_MY_PROFILE_ERROR),
    );
    done();
  });

  it('tests updateMyProfileAction failure on empty error object', async (done) => {
    moxios.stubRequest(`${API_HOST}/user/`, {
      status: 500,
      response: undefined,
    });

    await store.dispatch(updateMyProfileAction(updateProfileData));
    expect(store.getActions()).toContainEqual(
      failureMessage({ errors: 'Something went wrong when updating your profile.' }, UPDATE_MY_PROFILE_ERROR),
    );
    done();
  });

  it('test it gets GET_SINGLE_PROFILE_SUCCESS ', async (done) => {
    const data = {
      username: 'token',
      message: 'Success!',
    };

    const expectedActions = successMessage(data, GET_SINGLE_PROFILE_SUCCESS);

    moxios.stubRequest(`${API_HOST}/profiles/${data.username}/`, {
      status: 200,
      response: {
        username: 'token',
        message: 'Success!',
      },
    });

    await store.dispatch(getSingleUserProfileAction(data.username));
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });

  it('test it creates ERROR_FETCHING_ARTICLES when authenticated', async (done) => {
    const data = {
      username: 'token',
      message: 'Success!',
    };

    const expectedActions = failureMessage(data);

    moxios.stubRequest(`${API_HOST}/profiles/${data.username}/`, {
      status: 404,
      response: {
        username: 'token',
        message: 'Success!',
      },
    });

    await store.dispatch(getSingleUserProfileAction(data.username));
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });

  it('test it creates ERROR_FETCHING_ARTICLES with no response message', async (done) => {
    const data = {
      username: 'token',
      errors: { errors: 'Something went wrong when fetching your profile.' },
    };

    const expectedActions = failureMessage(data.errors);

    moxios.stubRequest(`${API_HOST}/profiles/${data.username}/`, {
      status: 403,
    });

    await store.dispatch(getSingleUserProfileAction(data.username));
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });
});
