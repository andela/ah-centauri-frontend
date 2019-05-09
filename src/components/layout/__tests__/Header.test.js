import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import { Header } from '../Header';


const setUp = () => {
  const props = {
    socialSignOut: jest.fn(),
  };

  const wrapper = mount(
    <Router>
      <Header {...props} />
    </Router>,
  );

  return {
    wrapper,
  };
};

describe('Register User test::', () => {
  const { wrapper } = setUp();
  it(' render header component', () => {
    const headerMenu = wrapper.find('.header-menu');

    expect(headerMenu.exists())
      .toBe(true);
  });
});
