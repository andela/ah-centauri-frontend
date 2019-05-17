import React from 'react';
import { shallow } from 'enzyme/build';
import expect from 'expect';

import PropTypes from 'prop-types';
import { MyArticleDraftItem } from '../MyArticleDraftItem';


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
    deleteArticle: jest.fn(),
  };
  const wrapper = shallow(<MyArticleDraftItem {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('MyArticleDraftItem component test', () => {
  const { wrapper, props } = setUp();

  it(' should handleInputChange function', () => {
    wrapper
      .instance()
      .handleArticleDelete({ preventDefault() {} });

    expect(props.deleteArticle).toBeCalledTimes(1);
  });
});
