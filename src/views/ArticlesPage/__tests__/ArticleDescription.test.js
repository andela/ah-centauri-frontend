import React from 'react';
import { shallow } from 'enzyme/build';
import expect from 'expect';

import { ArticlesDescription } from '../ArticlesDescription';


const setUp = () => {
  const props = {
    match: { params: { slug: 'test' } },
    articles: [],
    article: {},
    getAllArticles: jest.fn(),
    getSingleArticles: jest.fn(),
  };
  const wrapper = shallow(<ArticlesDescription {...props} />);

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
    expect(props.getSingleArticles).toBeCalledTimes(1);
  });

  it('render componentWillReceiveProps with change', () => {
    wrapper.setProps({ articles: [{ id: 1 }] });
    expect(wrapper.state().articles).toEqual([{ id: 1 }]);
  });

  it('render componentWillReceiveProps with no change', () => {
    wrapper.setProps();
    expect(wrapper.state().articles).toEqual([{ id: 1 }]);
  });
});
