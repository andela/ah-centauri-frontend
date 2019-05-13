import React from 'react';
import {mount} from 'enzyme';
import expect from 'expect';
import SocialShareLinksVertical from '../SocialShareLinksVertical';

const setUp = () => {
  const props = {
    shareLinks: {
      facebook: 'https://www.facebook.com/sharer/sharer.php?u=api/articles/alpha-is-a-developer-5/',
      twitter: 'https://twitter.com/intent/tweet?url=api/articles/alpha-is-a-developer-5/&text=%20developer',
      email: 'mailto:testuser@mailinator.com?&subject=Alpha%20is%20a%20developer&body=He%20is%20a%20good%20designer',
    },
  };
  const wrapper = mount(<SocialShareLinksVertical {...props} />);
  return { props, wrapper };
};

describe('test share link component', () => {
  const { wrapper } = setUp();
  it('Has all 3 buttons for link sharing', () => {
    expect(wrapper.find('.jssocials-share')).toHaveLength(3);
  });
});
