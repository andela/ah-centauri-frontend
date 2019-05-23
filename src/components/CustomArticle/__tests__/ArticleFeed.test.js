import React from 'react';
import { shallow } from 'enzyme/build';
import expect from 'expect';

import ArticleFeed from '../ArticleFeed';


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
      }
    ],
    bookmarks: [{ id: 1, article: { slug: 'alpha-is-a-developer-4' } }],
    authenticated: true,
  };
  const wrapper = shallow(<ArticleFeed {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('ArticleFeed page test', () => {
  const { wrapper, props } = setUp();

  it(' render article section exists', () => {
    const articleSection = wrapper.find('.pagination');

    expect(articleSection.exists()).toBe(true);
  });
});
