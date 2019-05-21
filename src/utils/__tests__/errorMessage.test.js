import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { SemanticToastContainer } from 'react-semantic-toasts';
import getResponseErrors, { setToastMessage } from '../errorMessage';

describe('Test responseErrors functions return the necessary errors objects', () => {
  it(' creates an object of errors', () => {
    const { responseErrorsObject } = getResponseErrors({
      errors: {
        detail: 'Authentication credentials required',
        phone: ['Phone number requires a valid integer'],
        password: [
          { passLength: 'Must be at least 6 characters' },
          { specialCharacters: 'Must have an alphabetic and numeric character' },
          'Password strength is too weak',
        ],
      },
    });
    expect(responseErrorsObject.detail).toBeTruthy();
  });
});

describe('Test setToastMessage function', () => {
  const callToastMessage = () => {
    setToastMessage({ message: 'Toast Message Loaded', error: ['error'], messageOptions: { type: 'info' } });
    setToastMessage('Toast Message Loaded');
  };
  const wrapper = mount(<SemanticToastContainer callToastMessage={callToastMessage} />);
  it(' creates an object of errors', () => {
    expect(wrapper.find('.ui-alerts')).toBeTruthy();
    wrapper.instance().props.callToastMessage();
  });
});
