import React from 'react';
import { mount } from 'enzyme';
// eslint-disable-next-line import/no-extraneous-dependencies
import expect from 'expect';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';

import Header from './Header';

const mockStore = configureMockStore();
const store = mockStore({
  auth: {
    authenticated: '',
    errorMessage: {},
  },
});

let component;

const props = {
  activeItem: 'home',
};

describe('Register User test', () => {
  beforeEach(() => {
    component = mount(
      <Provider store={store}>
        <Router>
          <Header {...props} />
        </Router>
      </Provider>,
    );
  });

  it('render header component', () => {
    expect(component.find('.header-menu').exists()).toBe(true);
  });
});
