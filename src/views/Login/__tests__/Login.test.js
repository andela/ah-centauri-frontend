import React from 'react';
import { mount } from 'enzyme/build';
// eslint-disable-next-line import/no-extraneous-dependencies
import expect from 'expect';

import { Login, mapStateToProps } from '../Login';


const setUp = () => {
  const props = {
    handleSubmit: jest.fn(),
    loginAction: jest.fn(),
  };

  const wrapper = mount(<Login {...props} />);

  return {
    wrapper,
    props,
  };
};

describe('Login page test', () => {
  const { wrapper } = setUp();

  it(' renders login component', () => {
    const loginDiv = wrapper.find('.login-form');

    expect(loginDiv.exists())
      .toBe(true);
  });

  it('handles onsubmit event', () => {
    wrapper.instance()
      .handleSubmit({ preventDefault: () => { } });

    const expectedState = {
      email: '',
      password: '',
    };

    expect(wrapper.state()).toEqual(expectedState);
  });

  it('should handle onchange function', () => {
    wrapper.instance().handleInputChange({
      target: {
        name: 'email',
        value: 'test@gmail.com',
      },
    });

    wrapper.instance().handleInputChange({
      target: {
        name: 'password',
        value: 'password',
      },
    });

    expect(wrapper.state()).toEqual({
      email: 'test@gmail.com',
      password: 'password',
    });
  });

  it('properly maps state to props', () => {
    const initialState = {
      auth: {
        errorMessage: { email: 'Email field is required.' },
      },
    };

    expect(mapStateToProps(initialState).errorMessage)
      .toEqual(initialState.auth.errorMessage);
  });
});
