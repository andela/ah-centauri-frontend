import expect from 'expect';
import getPayload from '../emailVerification';

describe('Testing extrating email verification data from url::', () => {
  it('returns token and user id when given uri string', () => {
    const payload = getPayload('/verify/567-d694322d135f28a50d47/Nw');
    expect(payload).toEqual({ token: '567-d694322d135f28a50d47', uid: 'Nw' });
  });
});
