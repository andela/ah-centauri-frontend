import expect from 'expect';
import getResponseErrors from '../errorMessage';

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
