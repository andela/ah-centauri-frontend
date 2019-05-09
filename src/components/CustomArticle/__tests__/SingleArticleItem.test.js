import React from 'react';
import { shallow } from 'enzyme/build';
import expect from 'expect';

import SingleArticleItem from '../SingleArticleItem';


const setUp = () => {
  const props = {
    article: {
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
  };
  const wrapper = shallow(<SingleArticleItem {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('SingleArticleItem page test', () => {
  const { wrapper, props } = setUp();

  it(' render article section exists', () => {
    const articleSection = wrapper.find('article');

    expect(articleSection.exists())
      .toBe(true);
  });
});
