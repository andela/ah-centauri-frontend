import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import {  mapStateToProps, _ResetPassword } from '../ResetPassword';


const setUp = () => {
  const props = {
    handleSubmit: jest.fn(),
    resetPasswordService: jest.fn(),
    successMessage: {},
    errorMessage: '',
    formState: '',
    token: '',
  };
  const wrapper = mount(<_ResetPassword {...props} />);
  return { props,wrapper };
};

describe('test reset password view', () => {
  const { wrapper } = setUp();

  it('handles submit event', () => {
    wrapper.instance().handleSubmit({ preventDefault() {},});
    const expectedState = {
      new_password: '',
      confirm_password: '',
      successMessage: {},
      errorMessage: '',
      formState: '',
      token: '',
    };
    expect(wrapper.state()).toEqual(expectedState);
  });

  it('handles onchange function', () => {
    wrapper.instance().handleChange({}, {
          name: 'new_password',
          value: 'ValAbc123!',
        });
    wrapper.instance().handleChange({}, {
          name: 'confirm_password',
          value: 'ValAbc123!',
        });
    expect(wrapper.state('new_password')).toEqual('ValAbc123!');
    expect(wrapper.state('confirm_password')).toEqual('ValAbc123!');

  });

  it('should map state to props', () => {
    const initialState = {
      resetReducer: {
        errorMessage: "errors",
        successMessage: {message : "success!"},
        formState: ''
      },
    };
    const mapStateToPropsFunction = mapStateToProps(initialState);
    expect(mapStateToPropsFunction.errorMessage)
      .toEqual(initialState.resetReducer.errorMessage);
  });

  it('should will recieve props', () => {
    const initialState = {
      errorMessage: "errors",
    };
    wrapper.setProps(initialState);
    expect(wrapper.state('errorMessage'))
      .toEqual(initialState.errorMessage);
  });
});
