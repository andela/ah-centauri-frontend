import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {API_HOST} from '../../services/Api';
import * as actions from '../bookmarksActions';
import {CREATE_SINGLE_BOOKMARK_ERROR, DELETE_SINGLE_BOOKMARK_ERROR} from '../types';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore();

describe('Bookmarks actions ', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });

  it('test FETCH_ALL_BOOKMARKS_SUCCESS when authenticated', async (done) => {
    const data = {
      bookmarks: [{
        id: 12,
      }],
      message: 'Success!',
    };

    const expectedActions = actions.bookmarksuccessMessage(data);

    moxios.stubRequest(`${API_HOST}/bookmarks/`, {
      status: 200,
      response: {
        message: 'Success!',
        bookmarks: [{
          id: 12,
        }],
      },
    });

    await store.dispatch(actions.getAllbookmarkedArticles());
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });

  it('test ERROR_FETCHING_ARTICLES when authenticated', async (done) => {
    const data = {
      message: 'Error!',
    };

    const expectedActions = actions.failureMessage(data);

    moxios.stubRequest(`${API_HOST}/bookmarks/`, {
      status: 404,
      response: {
        message: 'Error!',
      },
    });

    await store.dispatch(actions.getAllbookmarkedArticles());
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });

  it('test empty response error ERROR_FETCHING_ARTICLES when authenticated', async (done) => {
    const data = {
      errors: 'Something went wrong when fetching your bookmarks.',
    };

    const expectedActions = actions.failureMessage(data);

    moxios.stubRequest(`${API_HOST}/bookmarks/`, {
      status: 404,
      response: undefined,
    });

    await store.dispatch(actions.getAllbookmarkedArticles());
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });

  it('test CREATE_SINGLE_BOOKMARK when authenticated', async (done) => {
    const data = {
      message: 'Success!',
      bookmark: { slug: 'test' },
    };

    const expectedActions = actions.CreateBookmarkSuccessMessage(data);

    moxios.stubRequest(`${API_HOST}/bookmarks/${data.slug}/`, {
      status: 200,
      response: {
        ...data,
      },
    });

    await store.dispatch(actions.bookmarkArticle(data.slug));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });

  it('test async CREATE_SINGLE_BOOKMARK_ERROR when authenticated', async (done) => {
    const data = {
      errors: 'Something went wrong when creating your bookmarks.',
    };

    const expectedActions = actions.failureMessage(data, CREATE_SINGLE_BOOKMARK_ERROR);

    moxios.stubRequest(`${API_HOST}/bookmarks/fake-slug/`, {
      status: 404,
      response: {
        ...data,
      },
    });

    await store.dispatch(actions.bookmarkArticle('fake-slug'));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });

  it('test async empty error CREATE_SINGLE_BOOKMARK_ERROR when authenticated', async (done) => {
    const data = {
      errors: 'Something went wrong when creating your bookmarks.',
    };

    const expectedActions = actions.failureMessage(data, CREATE_SINGLE_BOOKMARK_ERROR);

    moxios.stubRequest(`${API_HOST}/bookmarks/fake-slug/`, {
      status: 404,
      response: undefined,
    });

    await store.dispatch(actions.bookmarkArticle('fake-slug'));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });

  it('test async DELETE_SINGLE_BOOKMARK when authenticated', async (done) => {
    const data = {
      message: 'Success!',
      id: 1,
    };

    const expectedActions = actions.deleteBookmarkSuccessMessage({
      message: data.message,
      id: data.id,
    });

    moxios.stubRequest(`${API_HOST}/bookmarks/${data.id}/`, {
      status: 200,
      response: {
        ...data,
      },
    });

    await store.dispatch(actions.removeBookmark(data.id));
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });


  it('test async with empty errors object DELETE_SINGLE_BOOKMARK_ERROR when authenticated', async (done) => {
    const data = {
      errors: 'Something went wrong when removing your bookmarks.',
    };

    const expectedActions = actions.failureMessage(data, DELETE_SINGLE_BOOKMARK_ERROR);

    moxios.stubRequest(`${API_HOST}/bookmarks/${data.id}/`, {
      status: 404,
      response: undefined,
    });

    await store.dispatch(actions.removeBookmark(data.id));
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });

  it('test async with object DELETE_SINGLE_BOOKMARK_ERROR when authenticated', async (done) => {
    const data = {
      errors: 'Something went wrong when removing your bookmarks.',
    };

    const expectedActions = actions.failureMessage(data, DELETE_SINGLE_BOOKMARK_ERROR);

    moxios.stubRequest(`${API_HOST}/bookmarks/${data.id}/`, {
      status: 404,
      response: {
        ...data,
      },
    });

    await store.dispatch(actions.removeBookmark(data.id));
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });
});
