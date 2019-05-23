import {mount, shallow} from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {Message} from 'semantic-ui-react';
import {BrowserRouter} from 'react-router-dom';
import {shape} from 'prop-types';
import {ProfilePage} from '../ProfilePage';
import setUpProfileTests from '../../../setupTests';
import Avatar from '../../../components/Profile/Avatar';
import {getMyProfileAction, updateMyProfileAction} from '../../../actions/profileActions';
import {getAllbookmarkedArticles} from '../../../actions/bookmarksActions';

const mock = new MockAdapter(axios);


// Instantiate router context
const router = {
  history: new BrowserRouter().history,
  route: {
    location: {},
    match: {},
  },
};

const createContext = () => ({
  context: { router },
  childContextTypes: { router: shape({}) },
  wrappingComponent: BrowserRouter,
});

function mountWrapProfilePage(props) {
  return mount(<ProfilePage {...props} />, createContext());
}

function shallowWrapProfilePage(props) {
  return shallow(<ProfilePage {...props} />, createContext());
}

// Test ProfilePage React Component
describe(' ProfilePage --- Test for profile page loading', () => {
  const mockStore = configureStore();
  let store;
  let profilePageComponent;
  let profilePageProps;
  const { initialProfileState } = setUpProfileTests();
  const {
    getProfileSuccessResponse,
    updateProfileErrorResponse,
    updateProfileSuccessResponse,
    getProfileErrorResponse,
  } = setUpProfileTests();

  mock.onGet('profile/me')
      .reply(200, getProfileSuccessResponse);

  mock.onPatch('user/')
      .reply(200, updateProfileSuccessResponse);

  beforeEach(() => {
    store = mockStore(initialProfileState);
    profilePageProps = {
      errorMessage: {phone: ['must be an integer']},
      getMyProfileAction,
      updateMyProfileAction,
      getAllbookmarkedArticles,
      handleSubmit: jest.fn(),
      authenticated: true,
      loading: false,
      bookmarks: {
        loading: false,
        errorMessage: {},
        message: 'Here are your bookmarks',
        bookmarks: [
          {
            id: 1,
            article: {
              slug: 'article', description: 'article', author: 'author', created_at: '20 August 2018',
            },
          },
          {
            id: 2,
            article: {
              slug: 'article', description: 'article', author: 'author', created_at: '20 August 2018',
            },
          },
        ],
      },
    };
    profilePageComponent = shallowWrapProfilePage(
      profilePageProps,
    );
  });

  it('renders avatar element in the page view', () => {
    expect(profilePageComponent.find(Avatar).exists()).toBe(true);
  });

  it('render unauthenticated message for the component if authenticated is false', () => {
    mock.onGet('profile/me')
      .reply(403, { response: { data: getProfileErrorResponse } });

    mock.onPatch('user/')
      .reply(400, { response: { data: updateProfileErrorResponse } });
    const noAuthProps = profilePageProps;
    noAuthProps.authenticated = false;
    const noAuthProfilePageComponent = shallowWrapProfilePage(
      noAuthProps,
    );
    expect(noAuthProfilePageComponent.find(Message).exists()).toBe(true);
  });

  it('render error message for the component', () => {
    mock.onGet('profile/me')
      .reply(403, { response: { data: getProfileErrorResponse } });

    mock.onPatch('user/')
      .reply(400, { response: { data: updateProfileErrorResponse } });
    profilePageProps.bookmarks.message = undefined;
    profilePageProps.bookmarks.bookmarks = [];
    profilePageProps.bookmarks.errorMessage = {errors: 'Auth credentials required'};
    const errorProfilePageComponent = shallowWrapProfilePage(
      profilePageProps,
    );
    const spy = jest.spyOn(errorProfilePageComponent.instance(), 'handleSubmit');
    errorProfilePageComponent.instance().handleSubmit({
      preventDefault() {
      },
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('render message for no bookmarks for the component', () => {
    mock.onGet('profile/me')
        .reply(403, {response: {data: getProfileErrorResponse}});

    mock.onPatch('user/')
        .reply(400, {response: {data: updateProfileErrorResponse}});
    profilePageProps.bookmarks.message = undefined;
    profilePageProps.bookmarks.bookmarks = [];
    profilePageProps.bookmarks.errorMessage = undefined;
    const errorProfilePageComponent = shallowWrapProfilePage(
        profilePageProps,
    );
    const spy = jest.spyOn(errorProfilePageComponent.instance(), 'handleSubmit');
    errorProfilePageComponent.instance().handleSubmit({
      preventDefault() {
      },
    });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it(' test handle onsubmit event and default state', () => {
    profilePageComponent.instance()
      .handleSubmit({
        preventDefault() {
        },
      });
    const expectedState = {
      username: '',
      first_name: '',
      last_name: '',
      bio: '',
      website: '',
      country: '',
      phone: '',
      city: '',
      readOnly: true,
      buttonName: 'Edit',
      visible: false,
      message: undefined,
    };
    expect(profilePageComponent.state())
      .toEqual(expectedState);
  });

  it(' should handle onchange function for form inputs', () => {
    profilePageComponent
      .instance()
      .handleInputChange({
        target: {
          name: 'first_name',
          value: 'todd',
        },
      });
    profilePageComponent
      .instance()
      .handleInputChange({
        target: {
          name: 'last_name',
          value: 'divelo',
        },
      });
    profilePageComponent
      .instance()
      .handleInputChange({
        target: {
          name: 'bio',
          value: 'Writing the future by reading about the past',
        },
      });
    const spy = jest.spyOn(profilePageComponent.instance(), 'handleDropdownInputChange');
    profilePageComponent
      .instance()
      .handleDropdownInputChange({
        preventDefault() {
        },
        target: { querySelector: jest.fn() },
      }, 'country');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(profilePageComponent.state('first_name'))
      .toEqual('todd');
    expect(profilePageComponent.state('last_name'))
      .toEqual('divelo');
    expect(profilePageComponent.state('bio'))
      .toEqual('Writing the future by reading about the past');
  });
});
