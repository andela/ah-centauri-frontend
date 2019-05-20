import React from 'react';
import { shallow } from 'enzyme/build';
import expect from 'expect';

import { CommentComponent } from '../Comments';


const setUp = () => {
  const props = {
    slug: 'path',
    comments: [{id: 1}, {id: 2}],
    user: 'valerie',
    getReplies: jest.fn(),
    deleteComment: jest.fn(),
    editComment: jest.fn(),
    createComment: jest.fn(),
    postReply: jest.fn(),
  };
  const wrapper = shallow(<CommentComponent {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('Comments component', () => {
  const { wrapper, props } = setUp();

  it(' test handle onsubmit event', () => {
    wrapper.instance()
        .handleSubmit({
          preventDefault() {
          },
        });
    expect(props.createComment)
        .toHaveBeenCalled();
  });

  it(' should handle onchange function', () => {
    wrapper.instance()
        .handleChange({
          preventDefault() {
          },
          target: {
            value: 'test@gmail.com',
          },
        });
    expect(wrapper.state('comment'))
        .toEqual('test@gmail.com');
  });
});
