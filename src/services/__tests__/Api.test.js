import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import expect from 'expect';
import {
  api,
  API_HOST,
} from '../Api';


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
    const data = { response: true };

    mock.onPost('users/reset')
      .reply(200, data);

    api.user.resetPassword({ new_password: 'Abc123@!', confirm_password: 'Abc123@!' })
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });

  it(' returns data when get my profile endpoint is called', () => {
    const data = { response: true };

    mock.onGet('profile/me')
      .reply(200, data);

    api.profile.getMyProfile()
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });

  it(' returns data when loginSocial is called', () => {
    const data = { response: true };

    mock.onPost('users/social')
      .reply(200, data);

    api.user.loginSocial({ url: "Abc123@!", payload: "Abc123@!" })
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });

  it(' returns data when update my profile endpoint is called', () => {
    const data = { response: true };

    mock.onPatch('profile/me')
      .reply(200, data);

    api.profile.getMyProfile()
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });

  it(' returns data when verify email is called ', () => {
    const data = { response: true };

    mock.onGet('verify-email/faketoken/fakeuid')
      .reply(200, data);

    api.user.verifyEmail({ token: 'faketoken', uid: 'fakeuid' })
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });

  it(' returns data when updateMyProfile is called ', () => {
    const data = { response: true };

    mock.onPatch('/user/')
      .reply(200, data);

    api.profile.updateMyProfile({})
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });

  it(' returns data when getAllArticles is called ', () => {
    const data = { response: true };

    mock.onGet('/articles')
      .reply(200, data);

    api.articles.getAllArticles()
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });

  it(' returns data when getSingleArticles is called ', () => {
    const data = {
      response: { slug: 'test' },
    };

    mock.onGet(`/articles/${data.response.slug}`)
      .reply(200, data);

    api.articles.getSingleArticles()
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });

  it(' returns data when createArticles is called ', () => {
    const data = {
      response: { slug: 'test' },
    };

    mock.onPost('/articles/')
      .reply(200, data);

    api.articles.createArticles(data)
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });

  it(' returns data when updateArticles is called ', () => {
    const data = {
      response: { slug: 'test' },
    };

    mock.onPut(`/articles/${data.response.slug}/`)
      .reply(200, data);

    api.articles.updateArticles(data)
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });

  it(' returns data when filterByAuthorArticles is called ', () => {
    const data = {
      response: { slug: 'test' },
    };

    mock.onGet(`/articles/q?author=${data.response.slug}`)
      .reply(200, data);

    api.articles.filterByAuthorArticles(data)
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });

  it(' returns data when deleteArticle is called ', () => {
    const data = {
      response: { slug: 'test' },
    };

    mock.onDelete(`/articles/${data.response.slug}`)
      .reply(200, data);

    api.articles.deleteArticle(data.response.slug)
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });

  it(' returns data when likeArticle is called ', () => {
    const data = {
      response: { slug: 'test' },
    };

    mock.onPost(`${API_HOST}/articles/${data.response.slug}/like/`)
      .reply(200, data);

    api.articles.likeArticle(data.response.slug)
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });

  it(' returns data when dislikeArticle is called ', () => {
    const data = {
      response: { slug: 'test' },
    };

    mock.onPost(`${API_HOST}/articles/${data.response.slug}/dislike/`)
      .reply(200, data);

    api.articles.dislikeArticle(data.response.slug)
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });

  it(' returns data when updateArticleRating is called ', () => {
    const data = {
      rating: { slug: 'test' },
    };

    mock.onPost(`${API_HOST}/articles/${data.rating.slug}/ratings/`)
      .reply(200, data);

    api.articles.updateArticleRating(data)
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });

  it(' returns data when getAllBookmarkArticle is called ', () => {
    const data = {
      response: { slug: 'test' },
    };

    mock.onGet(`${API_HOST}/bookmarks/`)
      .reply(200, data);

    api.bookmarks.getAllBookmarkArticle()
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });

  it(' returns data when bookmarkArticle is called ', () => {
    const data = {
      response: { slug: 'test' },
    };

    mock.onPost(`${API_HOST}/bookmarks/${data.response.slug}/`)
      .reply(200, data);

    api.bookmarks.bookmarkArticle(data.response.slug)
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });

  it(' returns data when unBookmarkArticle is called ', () => {
    const data = {
      response: { slug: 'test', id: 1 },
    };

    mock.onDelete(`${API_HOST}/bookmarks/${data.response.id}/`)
      .reply(200, data);

    api.bookmarks.removeBookmark(data.response.id)
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });

  it(' returns data when getUserNotifications is called ', () => {
    const data = {
      response: { slug: 'test', id: 1 },
    };

    mock.onGet(`${API_HOST}/notification/settings`)
      .reply(200, data);

    api.notifications.getUserNotificationSettings()
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });

  it(' returns data when updateNotifications is called ', () => {
    const data = {
      response: { slug: 'test', id: 1 },
    };

    mock.onPatch(`${API_HOST}/notification/settings`)
      .reply(200, data);

    api.notifications.updateNotificationSettings(data)
      .then((response) => {
        expect(response.data)
          .toEqual(data);
      });
  });
});
