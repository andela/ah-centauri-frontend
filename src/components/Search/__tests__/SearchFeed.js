import React from 'react';
import { shallow, mount } from 'enzyme/build';
import expect from 'expect';

import SearchFeed from '../SearchFeed';
import SearchItem from '../SearchItem';


const setUp = () => {
  const props = {
    articles: [
      {
        title: 'Alpha is a developer',
        tags: [
          'ondigo',
          'steve',
        ],
        slug: 'alpha-is-a-developer-4',
        body: 'is a very good story',
        description: 'He is a good designer',
        author: { username: 'test' },
        share_links: {
          facebook: '',
          twitter: 'https://twitter.com',
          email: 'mailto:?&subject=test',
        },
        read_time: '1 min read',
      },
    ],
    bookmarks: [{ id: 1, article: { slug: 'alpha-is-a-developer-4' } }],
    authenticated: true,
  };
  const wrapper = shallow(<SearchFeed {...props} />);
  console.log(wrapper.debug());

  return {
    props,
    wrapper,
  };
};
setTimeout();

describe('SearchFeed page test', () => {
  const { wrapper, props } = setUp();

  it(' render article section exists', () => {
    expect(
      wrapper.containsMatchingElement(
        <SearchItem />,
      ),
    ).toBeTruthy();
  });
});
