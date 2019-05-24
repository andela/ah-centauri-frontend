import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';

import { LikeDislike } from '../likeComment';

const setUp = () => {
  const props = {
    data: {
      id: 4,
      slug: 'path',
    },
    getSingleComment: jest.fn(),
    likeComment: jest.fn(),
    dislikeComment: jest.fn(),
  };
  const wrapper = shallow(<LikeDislike {...props} />);

  return {
    props,
    wrapper,
  };
};


describe('like comment component', () => {
  const { wrapper, props } = setUp();

  it(' to call ComponentDidMount', () => {
    expect(props.getSingleComment).toBeCalledTimes(1);
  });

  it(' should handle like ', () => {
    wrapper.instance()
      .handleLike({
        preventDefault() {
        },
      });
    expect(props.likeComment)
      .toHaveBeenCalledWith(props.data);
  });

  it(' should handle dislike ', () => {
    wrapper.instance()
      .handleDislike({
        preventDefault() {
        },
      });
    expect(props.dislikeComment)
      .toHaveBeenCalledWith(props.data);
  });
});
