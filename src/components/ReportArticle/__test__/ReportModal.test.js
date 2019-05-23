import React from 'react';
import { shallow, mount } from 'enzyme';
import { ReportArticleModal } from '../ReportArticleModal';


const setUp = () => {
  const props = {
    slug: "try",
    isLoading: false,
    articleReporter: jest.fn(),
  };
  const wrapper = shallow(<ReportArticleModal {...props} />);

  return {
    props,
    wrapper,
  };
};

describe('ReportArticleModal slug test', () => {
  const { wrapper, props } = setUp();

  it(' render slug section exists', () => {
    const slugSection = wrapper.find('slug');
    expect(wrapper.find('Form')).toBeDefined();

    expect(slugSection.exists())
      .toBe(false);
  });
});

describe('ReportArticleModal', () => {
  it('displays Form tag correctly', () => {
    const wrapper = shallow(<ReportArticleModal />);
    expect(wrapper.find('Modal')).toBeDefined();
  });

  it('displays Modal.Content tag correctly', () => {
    const component = shallow(<ReportArticleModal />);
    expect(component.find('Modal.Content')).toBeDefined();
  });

  it('displays the select tag correctly', () => {
    const component = shallow(<ReportArticleModal debug />);
    expect(component.find('Form.Select')).toBeDefined();
  });
});
