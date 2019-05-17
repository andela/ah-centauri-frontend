import React from 'react';
import { shallow } from 'enzyme/build';
import expect from 'expect';
import { ArticleRating } from '../ArticleRating';

const setUp = () => {
  const props = {
    article: {
      has_rating: true,
      slug: 'alpha-is-a-developer-4',
    },
    authUserRating: {
      id: 11,
      created_at: 'Fri May 17 08:37:38 2019',
      updated_at: 'Fri May 17 08:37:47 2019',
      value: 5,
      review: 'this is a rating',
    },
    hasRating: true,
    updateRating: jest.fn(),
    handleSubmit: jest.fn(),
    handleInputChange: jest.fn(),
  };


  const wrapper = shallow(<ArticleRating {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('ArticleRating component test', () => {
  const { wrapper, props } = setUp();

  it('renders ArticleRating component', () => {
    const ratingForm = wrapper.find('._rating');

    expect(ratingForm.exists())
      .toBe(true);
  });

  it('it toggles rating input fields (visible -> hidden)', () => {
    const instance = wrapper.instance();

    jest.spyOn(instance, 'toggleRating');
    instance.toggleRating({
      preventDefault: () => {},
      target: {
        style: {
          display: '',
        },
      },
    });
    expect(instance.toggleRating).toHaveBeenCalled();
  });

  it('it toggles rating input fields (visible -> hidden)', () => {
    const spyFunction = jest.fn().mockImplementation(a => ({
      style: {
        display: '',
      },
    }));

    Object.defineProperty(document, 'querySelector', {
      value: spyFunction,
    });

    wrapper.find('._rating').simulate('submit', {
      preventDefault: () => {},
    });

    expect(spyFunction).toBeCalled();
  });

  it('calls handleRating function when input changes', () => {
    const instance = wrapper.instance();

    jest.spyOn(instance, 'handleRating');
    instance.handleRating({
      preventDefault: () => {},
    }, { rating: 1, maxRating: 5 });

    expect(instance.handleRating).toHaveBeenCalled();
    expect(wrapper.state('value')).toBe(1);
  });


  it('calls handleInputChange function when review input changes', () => {
    const instance = wrapper.instance();

    jest.spyOn(instance, 'handleInputChange');
    instance.handleInputChange({
      preventDefault: () => {},
      target: {
        value: 'this is a review',
      },
    });

    expect(instance.handleInputChange).toHaveBeenCalled();
    expect(wrapper.state('review')).toBe('this is a review');
  });
});
