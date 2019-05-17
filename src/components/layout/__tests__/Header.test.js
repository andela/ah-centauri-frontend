import React from 'react';
import {shallow} from 'enzyme';

import {HeaderLayout, mapStateToProps,} from '../HeaderLayout';


const setUp = () => {
  const props = {
    authenticated: false,
    profile: {},
    getMyProfileAction: jest.fn(),
    loginAction: jest.fn(),
    signUpAction: jest.fn(),
  };

  const wrapper = shallow(<HeaderLayout {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('Header layout test::', () => {
  const { wrapper, props } = setUp();
  it(' render header component', () => {
    const headerMenu = wrapper.find('header');

    expect(headerMenu.exists())
        .toBe(true);
  });

  it('properly maps state to props', () => {
    const initialState = {
      auth: {
        authenticated: true,
      },
      profile: {
        current_profile: {},
      },
    };

    expect(mapStateToProps(initialState).authenticated)
        .toEqual(initialState.auth.authenticated);
  });


  it(' to call ComponentDidMount', () => {
    expect(props.getMyProfileAction).toBeCalledTimes(1);
  });

  it('render componentWillReceiveProps with change', () => {
    wrapper.setProps({ profile: { username: 'test' } });
    expect(wrapper.state().username).toEqual('test');
  });

  it('render componentWillReceiveProps with no change', () => {
    wrapper.setProps();
    expect(wrapper.state().username).toEqual('test');
  });

  it(' should handleToggle function', () => {
    wrapper
        .instance()
        .handleToggle();

    expect(wrapper.state('toggle'))
        .toBe(true);
  });

  it(' should handleModal function', () => {
    wrapper
        .instance()
        .handleModal();

    expect(wrapper.state('opened'))
        .toBe(true);
  });
});