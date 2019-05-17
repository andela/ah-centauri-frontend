import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import {  mapStateToProps, _ResetPasswordLink } from '../ResetPasswordLink';


const setUp = () => {
  const props = {
    handleSubmit: jest.fn(),
    resetPasswordLinkService: jest.fn(),
    successMessage: {},
    errorMessage: '',
    formState: '',
  };
  const wrapper = shallow(<_ResetPasswordLink {...props} />);
  return { props,wrapper };
};

describe('test get reset password link view', () => {
  const { wrapper } = setUp();

  it('handles submit event', () => {
    wrapper.instance().handleSubmit({ preventDefault() {},});
    const expectedState = {
      email: '',
      successMessage: {},
      errorMessage: '',
      formState: '',
    };
    expect(wrapper.state()).toEqual(expectedState);
  });

  it('handles onchange function', () => {
    wrapper.instance().handleChange({
        target : {
            name: 'email',
            value: 'user@mail.com',
          }
    });
    expect(wrapper.state('email')).toEqual('user@mail.com');
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
