import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import { Header } from '../Header';


const setUp = () => {
  const wrapper = mount(
    <Router>
      <Header/>
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
