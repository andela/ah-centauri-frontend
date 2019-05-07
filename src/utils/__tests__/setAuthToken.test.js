import axios from 'axios';
import setAuthToken from '../setAuthToken';

describe('SetAuthToken function is called:: ', () => {
  it('when token exist', () => {
    const token = 'my_token_is_here';
    setAuthToken(token);
    expect(axios.defaults.headers.common.Authorization)
      .toBe(`Bearer ${token}`);
  });

  it('when token does not exist', () => {
    setAuthToken();
    expect(axios.defaults.headers.common.Authorization)
      .toBe(undefined);
  });
});
