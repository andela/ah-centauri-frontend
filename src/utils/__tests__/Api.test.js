import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import expect from 'expect';
import { api } from '../Api';


describe('Api service function test: ', () => {
  const mock = new MockAdapter(axios);

  it(' returns data when signup is called', () => {
    // setup
    // This sets the mock adapter on the default instance
    const data = { response: true };

    // `config` is the axios config and contains things like the url
    // return an array in the form of [status, data, headers]
    mock.onPost('users/')
      .reply(201, data);

    // work
    api.user.signup({ username: 'test' })
      .then((response) => {
        // expect
        expect(response.data)
          .toEqual(data);
      });
  });

  it('returns user data when login is called', () => {
    const data = { response: true };

    mock.onPost('users/login/')
      .reply(201, data);

    api.user.login({ username: 'test' })
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });
  

  it(' returns data when resetPasswordLink is called', () => {
    const mock = new MockAdapter(axios);
    const data = { response: true }; 

    mock.onPost('users/reset')
      .reply(200, data);

    api.user.resetPasswordLink({ email: 'test@mail.com' })
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });

  it(' returns data when resetPassword is called', () => {
    const mock = new MockAdapter(axios);
    const data = { response: true }; 

    mock.onPost('users/reset')
      .reply(200, data);

    api.user.resetPassword({ new_password: "Abc123@!", confirm_password: "Abc123@!" })
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });

});
