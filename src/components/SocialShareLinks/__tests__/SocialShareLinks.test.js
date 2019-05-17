import React from 'react';
import {mount} from 'enzyme';
import {Button} from 'semantic-ui-react';
import expect from 'expect';
import CircularSocial from '../SocialShareLinks';

const setUp = () => {
  const props = {
    shareLinks: {
      facebook: 'https://www.facebook.com/sharer/sharer.php?u=api/articles/alpha-is-a-developer-5/',
      twitter: 'https://twitter.com/intent/tweet?url=api/articles/alpha-is-a-developer-5/&text=%20developer',
      email: 'mailto:testuser@mailinator.com?&subject=Alpha%20is%20a%20developer&body=He%20is%20a%20good%20designer',
    },
    size: 'medium',
  };
  const wrapper = mount(<CircularSocial {...props} />);
  return { props, wrapper };
};

describe('test share link component', () => {
  const { wrapper } = setUp();
  it('Has all 3 buttons for link sharing', () => {
    expect(wrapper.find(Button)).toHaveLength(3);
  });
});
