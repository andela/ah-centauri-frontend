import React from 'react';
import { shallow } from 'enzyme/build';
import expect from 'expect';

import { ArticleItem } from '../ArticleItem';


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
    bookmarks: [{ id: 1, article: { slug: 'alpha-is-a-developer-4' } }],
    authenticated: true,
    bookmarkArticle: jest.fn(),
    removeBookmark: jest.fn(),
  };
  const wrapper = shallow(<ArticleItem {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('ArticleItem page test', () => {
  const { wrapper, props } = setUp();

  it(' render article section exists', () => {
    const articleSection = wrapper.find('article');

    expect(articleSection.exists())
      .toBe(true);
  });

  it('should handle onchange function', () => {
    wrapper.instance().handleBookmark({
      preventDefault: () => {
      }
    }, props.article.slug);

    wrapper.instance().handleUnBookmark({
      preventDefault: () => {
      }
    }, props.bookmarks[0].id);


    expect(props.bookmarkArticle).toBeCalledTimes(1);
    expect(props.removeBookmark).toBeCalledTimes(1);
  });
});
