import React from 'react';
import { mount } from 'enzyme/build';
// eslint-disable-next-line import/no-extraneous-dependencies
import expect from 'expect';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';

import Homepage from '../Homepage';


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
        <Homepage/>
      </Router>
    </Provider>,
  );

  return {
    wrapper,
  };
};

describe('Home page test', () => {
  const { wrapper } = setUp();

  it(' render home component', () => {
    const homeDiv = wrapper.find('#home');

    expect(homeDiv.exists())
      .toBe(true);
  });
});
