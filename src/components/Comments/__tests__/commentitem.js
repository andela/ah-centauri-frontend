import React from 'react';
import { shallow } from 'enzyme/build';
import expect from 'expect';

import { CommentItemComponent } from '../CommentItem';


const setUp = () => {
  const props = {
    slug: 'path',
    comment: {id: 1},
    user: 'valerie',
    getReplies: jest.fn(),
    deleteComment: jest.fn(),
    editComment: jest.fn(),
    postReply: jest.fn(),
  };
  const wrapper = shallow(<CommentItemComponent {...props} />);
  
  return {
    props,
    wrapper,
  };
};

describe('Comment item component', () => {
  const { wrapper, props}  = setUp();
  
  it(' should handle edit ', () => {
    wrapper.instance()
      .handleEdit({
        preventDefault() {
        },
      });
    expect(wrapper.state('edit'))
      .toEqual(true);
  });
  
  it(' should handle reply ', () => {
    wrapper.instance()
      .handleReply({
        preventDefault() {
        },
      });
    expect(wrapper.state('reply'))
      .toEqual(true);
  });
  
  it(' should handle edit Change event', () => {
    wrapper.instance()
      .handleEditChange({
        preventDefault() {
        },
        target: {
          value: 'test@gmail.com',
        },
      });
    expect(wrapper.state('editedReply'))
      .toEqual('test@gmail.com');
  });
  
  it(' test handle edit onsubmit event', () => {
    wrapper.instance()
      .handleEditSubmit({
        preventDefault() {
        },
        target: {
          parentElement: <div/>,
          value: 'test@gmail.com',
        },
      });
    expect(props.editComment)
      .toHaveBeenCalled();
    expect(wrapper.state('edit')).toEqual(false);
  });
  
  it(' test handle reply onsubmit event', () => {
    wrapper.instance()
      .handleReplySubmit({
        preventDefault() {
        },
        target: {
          parentElement: <div/>,
          value: 'test@gmail.com',
        },
      });
    expect(props.postReply)
      .toHaveBeenCalled();
    expect(wrapper.state('reply')).toEqual(false);
  });
  
  it(' should handle delete ', () => {
    wrapper.instance()
      .handleDeleteComment({
        preventDefault() {
        },
        target: {
          parentElement: <div/>,
          value: 'test@gmail.com',
        },
      });
    expect(props.deleteComment)
      .toHaveBeenCalled();
  });
  
  it(' should handle view replies ', () => {
    wrapper.instance()
      .handleViewMoreReplies({
        preventDefault() {
        },
        target: {
          parentElement: <div/>,
          value: 'test@gmail.com',
        },
      });
    expect(props.getReplies)
      .toHaveBeenCalled();
  });
});
