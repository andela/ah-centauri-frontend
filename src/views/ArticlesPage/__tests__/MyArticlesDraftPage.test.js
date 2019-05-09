import React from 'react';
import { shallow } from 'enzyme/build';
import expect from 'expect';

import { MyArticlesDraftPage } from '../MyArticlesDraftPage';


const setUp = () => {
  const props = {
    match: { params: { username: 'test' } },
    articles: [],
    profile: {},
    filterByAuthorArticles: jest.fn(),
  };
  const wrapper = shallow(<MyArticlesDraftPage {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('MyArticlesDraftPage page test', () => {
  const { wrapper, props } = setUp();

  it(' render home section exists', () => {
    const homeSection = wrapper.find('#home');

    expect(homeSection.exists())
      .toBe(true);
  });

  it(' to call ComponentDidMount', () => {
    expect(props.filterByAuthorArticles).toBeCalledTimes(1);
  });
});
