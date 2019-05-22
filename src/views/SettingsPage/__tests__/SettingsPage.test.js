import React from 'react';
import { shallow } from 'enzyme/build';
import expect from 'expect';

import { SettingsPage } from '../SettingsPage';


const setUp = () => {
  const props = {
    notifications: {},
    signoutAction: jest.fn(),
    getUserNotifications: jest.fn(),
    updateNotifications: jest.fn(),
  };

  const wrapper = shallow(<SettingsPage {...props} />);

  return {
    wrapper,
    props,
  };
};

describe('SettingsPage page test', () => {
  const { wrapper, props } = setUp();

  it(' renders SettingsPage component', () => {
    const listUl = wrapper.find('.list');

    expect(listUl.exists())
      .toBe(true);
  });

  it('render componentWillReceiveProps with no change', () => {
    wrapper.setProps();
    expect(wrapper.state().user).toEqual(undefined);
  });

  it(' handle handleEmailtoggle event', () => {
    wrapper.instance()
      .handleEmailtoggle({
        preventDefault() {
        }
      });

    expect(props.updateNotifications).toBeCalledTimes(1);
  });

  it(' handle handleInApptoggle event', () => {
    wrapper.instance()
      .handleInApptoggle({
        preventDefault() {
        }
      });

    expect(props.updateNotifications).toBeCalledTimes(2);
  });

  it(' handle handleSignOut event', () => {
    wrapper.instance()
      .handleSignOut({
        preventDefault() {
        }
      });

    expect(props.signoutAction).toBeCalledTimes(1);
  });
});
