import React from 'react';
import { shallow } from 'enzyme/build';
import expect from 'expect';

import {
  HomePage,
  mapStateToProps,
} from '../Homepage';


const setUp = () => {
  const props = {
    articles: [],
    getAllArticles: jest.fn(),
  };
  const wrapper = shallow(<HomePage {...props} />);

  return {
    wrapper,
  };
};

describe('Home page test', () => {
  const { wrapper } = setUp();

  it(' render home component', () => {
    const homeDiv = wrapper.find('#home');

    expect(homeDiv.exists())
      .toBe(true);
  });

  it('properly maps state to props', () => {
    const initialState = {
      articles: {
        articles: {},
      },
    };

    expect(mapStateToProps(initialState).articles)
      .toEqual(initialState.articles.articles);
  });
});
