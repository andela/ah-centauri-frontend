import React from 'react';
import {mount} from 'enzyme/build';
// eslint-disable-next-line import/no-extraneous-dependencies
import expect from 'expect/build/index';
import Avatar from '../Avatar';

const props = {
  username: 'test_user',
};

let avatar;
let editableAvatar;

describe('Test Avatar Component', () => {
  beforeEach(() => {
    avatar = mount(
        <Avatar username={props.username}/>,
    );
    editableAvatar = mount(
        <Avatar username={props.username} size="medium" editAvatar/>,
    );
  });

  it('test render for avatar component', () => {
    expect(avatar.find('.avatar-username').exists()).toBeTruthy();
    expect(avatar.find('[name="uploadAvatar"]').exists()).toBeFalsy();
    expect(editableAvatar.find('[name="uploadAvatar"]').exists()).toBeTruthy();
  });
});
