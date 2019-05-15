import expect from 'expect';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'enzyme';
import getPayload from '../emailVerification';
import { VerifyEmail } from '../../components/VerifyEmail/VerifyEmail';

const setUp = () => {
  const props = {
    location: {
      pathname: 'some/location/here',
    },
    history: {
      push: url => url,
    },
    verifyEmailAction: () => {},
  };

  const wrapper = mount(
    <Router>
      <VerifyEmail {...props} />
    </Router>,
  );

  return {
    wrapper,
  };
};

describe('Testing extrating email verification data from url::', () => {
  const { wrapper } = setUp();

  it('returns token and user id when given uri string', () => {
    const payload = getPayload('/verify/567-d694322d135f28a50d47/Nw');
    expect(payload).toEqual({ token: '567-d694322d135f28a50d47', uid: 'Nw' });
  });
});
