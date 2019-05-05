import {mount} from 'enzyme/build';
import React from 'react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {ProfilePage} from '../ProfilePage';
import setUpProfileTests from '../../../setupTests';


// Test ProfilePage React Component
describe(' ProfilePage --- Test for profile page loading', () => {
  const mockStore = configureStore();
  let store;
  let connectedProfilePage;
  const {initialProfileState} = setUpProfileTests();
  const hist = createBrowserHistory();

  beforeEach(() => {
    store = mockStore(initialProfileState);
    connectedProfilePage = mount(
        <Router history={hist}>
          <Provider store={store}>
            <ProfilePage
                authenticated
                getMyProfileAction={() => jest.fn()}
            />
          </Provider>
        </Router>,
    );
  });

  it('renders with the store connection for a smart Profile page view', () => {
    expect(connectedProfilePage.find('.profile-form')).toBeDefined();
    expect(connectedProfilePage.find('[name="Edit Profile"]')).toBeDefined();
  });
});
