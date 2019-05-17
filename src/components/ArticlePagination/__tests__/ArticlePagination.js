import React from 'react';
import { shallow, mount } from 'enzyme';

import ArticlePagination from '../ArticlePagination';
import { _HomePage } from '../../../views/HomePage/Homepage' ;


describe('Article pagination: ', () => {
  it('renders page numbers', () => {
    const wrapper = shallow(<ArticlePagination articlesCount={20} />);
    expect(wrapper.find('.page-numbers')).toHaveLength(4);
  });

  it('does not render when article count is less than 10', () => {
    const wrapper = shallow(<ArticlePagination articlesCount={5} />);
    expect(wrapper.find('.page-numbers')).toHaveLength(0);
  });

  it('calls set page with correct parameter when link is clicked', () => {
    const props = {
      setPage: jest.fn(),
      onSetPage: jest.fn(),
      currentPage: 1,
      articlesCount: 20
    };
    const wrapper = mount(<ArticlePagination {...props} />);
    wrapper.find('.current').simulate('click', {
      preventDefault: () => {
      }
     });
    expect(props.onSetPage).toHaveBeenCalledWith(1);
  });

  it('Set page to the next page when next is clicked', () => {
    const props = {
      setPage: jest.fn(),
      onSetPage: jest.fn(),
      currentPage: 1,
      articlesCount: 20
    };
    const wrapper = mount(<ArticlePagination {...props} />);
    wrapper.find('#next').simulate('click', {
      preventDefault: () => {
      }
     });
    expect(props.onSetPage).toHaveBeenCalledWith(2);
  });
  
  it('Set page to the previous page when prev is clicked', () => {
    const props = {
      setPage: jest.fn(),
      onSetPage: jest.fn(),
      currentPage: 2,
      articlesCount: 20
    };
    const wrapper = mount(<ArticlePagination {...props} />);
    wrapper.find('#prev').simulate('click', {
      preventDefault: () => {
      }
     });
    expect(props.onSetPage).toHaveBeenCalledWith(1);

  });
});


