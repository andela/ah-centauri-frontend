import React from 'react';
import { shallow } from 'enzyme/build';
import expect from 'expect';

import { ArticlesPage } from '../ArticlesPage';
import PropTypes from 'prop-types';


const setUp = () => {
  const props = {
    match: { params: { slug: 'test' } },
    articles: [],
    bookmarks: [],
    getAllArticles: jest.fn(),
    getSingleArticles: jest.fn(),
    getAllbookmarkedArticles: jest.fn(),
  };
  const wrapper = shallow(<ArticlesPage {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('ArticlesDescription page test', () => {
  const { wrapper, props } = setUp();

  it(' render home section exists', () => {
    const homeSection = wrapper.find('#home');

    expect(homeSection.exists())
      .toBe(true);
  });

  it(' to call ComponentDidMount', () => {
    expect(props.getAllArticles).toBeCalledTimes(1);
    expect(props.getAllbookmarkedArticles).toBeCalledTimes(1);
  });
});
