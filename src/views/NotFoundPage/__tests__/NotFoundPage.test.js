import React from 'react';
import { shallow } from 'enzyme/build';
import expect from 'expect';

import NotFoundPage from '../NotFoundPage';


const setUp = () => {
  const wrapper = shallow(<NotFoundPage />);

  return {
    wrapper,
  };
};

describe('NotFoundPage page test', () => {
  const { wrapper } = setUp();

  it(' render home section exists', () => {
    const homeSection = wrapper.find('#home');

    expect(homeSection.exists())
      .toBe(true);
  });

  it(' render NotFoundPage component', () => {
    const notfoundDiv = wrapper.find('.not-found');

    expect(notfoundDiv.exists())
      .toBe(true);
  });
});
