import React from 'react';
import { shallow } from 'enzyme/build';
import expect from 'expect';

import { SingleProfile } from '../SingleProfile';


const setUp = () => {
  const props = {
    match: {
      params: { slug: 'test' },
    },
    history: {
      push: jest.fn(),
    },
    message: '',
    errorMessage: {},
    articles: {},
    getSingleUserProfileAction: jest.fn(),
    handleFollow: jest.fn(),
    handleUnFollow: jest.fn(),
    getUserFollow: jest.fn(),
    authenticated: false,
    loading: false,
    profile: {
      followers: [{ username: 'test' }],
    },
    currentProfile: { username: 'test' },
    filterByAuthorArticles: jest.fn(),
  };
  const wrapper = shallow(<SingleProfile {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('SingleProfile page test', () => {
  const { wrapper, props } = setUp();

  it(' render home section exists', () => {
    const homeSection = wrapper.find('.home');

    expect(homeSection.exists())
      .toBe(true);
  });

  it(' to call ComponentDidMount no username', () => {
    expect(props.history.push).toBeCalledTimes(1);
  });

  it(' to call ComponentDidMount with username', () => {
    wrapper.setProps({
      match: {
        params: { slug: 'test', username: 'test' },
      },
    });
    expect(props.getUserFollow).toBeCalledTimes(1);
    expect(props.filterByAuthorArticles).toBeCalledTimes(1);
    expect(props.getSingleUserProfileAction).toBeCalledTimes(1);
  });

  it('render componentWillReceiveProps with change', () => {
    wrapper.setProps({ profile: { username: 'test' } });
    expect(wrapper.state().username).toEqual('test');
  });

  it('render handlefollow and unfollow', () => {
    wrapper.instance().handleFollow();
    wrapper.instance().handleUnFollow();

    expect(props.handleFollow).toBeCalledTimes(1);
    expect(props.handleUnFollow).toBeCalledTimes(1);
  });
});
