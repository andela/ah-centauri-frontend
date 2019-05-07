import React from 'react';
import { mount } from 'enzyme/build';
// eslint-disable-next-line import/no-extraneous-dependencies
import expect from 'expect';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';

import Login from '../Login';


const setUp = () => {
  const mockStore = configureMockStore();
  const store = mockStore({
    auth: {
      authenticated: '',
      errorMessage: {},
    },
  });

  const wrapper = mount(
    <Provider store={store}>
      <Router>
        <Login/>
      </Router>
    </Provider>,
  );

  return {
    wrapper,
  };
};

describe('Login page test', () => {
  const { wrapper } = setUp();

  it(' render login component', () => {
    const loginDiv = wrapper.find('#login');

    expect(loginDiv.exists())
      .toBe(true);
  });
});
