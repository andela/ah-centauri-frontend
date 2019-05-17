import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect';

import { mapStateToProps, RegisterPage, } from '../RegisterPage';


const setUp = () => {
  const props = {
    handleSubmit: jest.fn(),
    signUpAction: jest.fn(),
  };
  const wrapper = mount(<RegisterPage {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('Register page Rendered: ', () => {
  const { wrapper } = setUp();

  it(' render form component', () => {
    const formFile = wrapper.find('.register-form');

    expect(formFile.exists())
      .toBe(true);
  });

  it(' test handle onsubmit event', () => {
    wrapper.instance()
      .handleSubmit({
        preventDefault() {
        },
      });
    const expectedState = {
      email: '',
      password: '',
      username: '',
    };
    expect(wrapper.state())
      .toEqual(expectedState);
  });

  it(' should handle onchange function', () => {
    wrapper
      .instance()
      .handleInputChange({
        target: {
          name: 'email',
          value: 'test@gmail.com',
        },
      });
    wrapper
      .instance()
      .handleInputChange({
        target: {
          name: 'username',
          value: 'test',
        },
      });
    wrapper
      .instance()
      .handleInputChange({
        target: {
          name: 'password',
          value: 'test@Gmail',
        },
      });
    expect(wrapper.state('email'))
      .toEqual('test@gmail.com');
    expect(wrapper.state('username'))
      .toEqual('test');
    expect(wrapper.state('password'))
      .toEqual('test@Gmail');
  });

  it(' test mapStateToProps function', () => {
    const initialState = {
      auth: {
        errorMessage: { username: 'Username field is required.' },
        loading: false,
        successMessage: '',
      },
    };
    const mapStateToPropsFunction = mapStateToProps(initialState);
    expect(mapStateToPropsFunction.errorMessage)
      .toEqual(initialState.auth.errorMessage);
  });

  it(' should will receive signup props', () => {
    const initialState = {
      errorMessage: { username: 'Username field is required.' },
    };
    wrapper.setProps(initialState);
    expect(wrapper.state('errorMessage'))
      .toEqual(initialState.errorMessage);
  });
});
