import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import expect from 'expect';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import { RegisterPage } from './RegisterPage';

// Snapshot for Register React Component
describe('>>>R E G I S T E R --- Snapshot', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<RegisterPage signUpAction={() => jest.fn()}/>);
  });

  it('+++capturing Snapshot of Home', () => {
    const renderedValue = renderer.create(<RegisterPage signUpAction={() => jest.fn()}/>).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  it('render form with inputs and buttons', () => {
    expect(wrapper.find('.signup-form')).toBeDefined();
  });
});
