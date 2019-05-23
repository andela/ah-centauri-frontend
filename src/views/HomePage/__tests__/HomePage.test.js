import React from 'react';
import { shallow } from 'enzyme/build';
import expect from 'expect';

import {
  HomePage,
  mapStateToProps,
} from '../Homepage';


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
    currentPage: 1,
    bookmarks: [{ id: 1, article: { slug: 'alpha-is-a-developer-4' } }],
    authenticated: true,
    setPage: jest.fn(),
    getAllArticles: jest.fn(),
    getAllbookmarkedArticles: jest.fn(),
  };
  const wrapper = shallow(<HomePage {...props} />);

  return {
    wrapper,
    props,
  };
};

describe('Home page test', () => {
  const { wrapper, props } = setUp();

  it(' render home component', () => {
    const homeDiv = wrapper.find('#home');

    expect(homeDiv.exists())
      .toBe(true);
  });

  it('properly maps state to props', () => {
    const initialState = {
      articles: {
        articles: [{ id: '', slug: 'test' }],
        articlesCount: 1,
        currentPage: 1,
      },
      auth: {
        authenticated: true,
      },
      bookmarks: {
        bookmarks: [{ id: 1, article: {} }],
      },
    };

    expect(mapStateToProps(initialState).articles)
      .toEqual(initialState.articles.articles);
  });

  it('render componentWillReceiveProps with change', () => {
    const initialState = {
      articles: [
        { id: '', slug: 'test' },
      ],
      auth: {
        authenticated: true,
      },
      bookmarks: [{ id: 1, article: {} }],
      currentPage: 2,
    };
    wrapper.setProps(initialState);
    expect(props.getAllbookmarkedArticles).toBeCalledTimes(2);
  });

  it('should handle onSetPage function', () => {
    wrapper.instance().onSetPage(3);

    expect(props.setPage).toBeCalledTimes(1);
  });
});
