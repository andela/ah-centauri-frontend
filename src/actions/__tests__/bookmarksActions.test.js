import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { API_HOST } from '../../services/Api';
import * as actions from '../bookmarksActions';
import { errorMessage } from '../articlesActions';
import { bookmarksuccessMessage } from '../bookmarksActions';
import { CreateBookmarkSuccessMessage } from '../bookmarksActions';
import { deleteBookmarkSuccessMessage } from '../bookmarksActions';

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

  it('test FETCH_ALL_BOOKMARKS when authenticated', async (done) => {
    const data = {
      token: 'token',
      message: 'Success!',
    };

    const expectedActions = actions.bookmarksuccessMessage(data);

    moxios.stubRequest(`${API_HOST}/bookmarks/`, {
      status: 200,
      response: {
        bookmarks: {
          token: 'token',
          message: 'Success!',
        },
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

    const expectedActions = errorMessage(data);

    moxios.stubRequest(`${API_HOST}/bookmarks/`, {
      status: 404,
      response: {
        message: 'Error!',
      },
    });

    await store.dispatch(actions.getAllbookmarkedArticles());
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });

  it('test CREATE_SINGLE_BOOKMARK when authenticated', async (done) => {
    const data = {
      message: 'Success!',
      slug: 'test',
    };

    const expectedActions = actions.CreateBookmarkSuccessMessage(data);

    moxios.stubRequest(`${API_HOST}/bookmarks/${data.slug}/`, {
      status: 200,
      response: {
        bookmark: {
          message: 'Success!',
          slug: 'test',
        },
      },
    });

    await store.dispatch(actions.bookmarkArticle(data.slug));
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });

  it('test ERROR_FETCHING_ARTICLES when authenticated', async (done) => {
    const data = {
      message: 'Error!',
      slug: 'test',
    };

    const expectedActions = errorMessage(data);

    moxios.stubRequest(`${API_HOST}/bookmarks/${data.slug}/`, {
      status: 404,
      response: {
        message: 'Error!',
        slug: 'test',
      },
    });

    await store.dispatch(actions.bookmarkArticle(data.slug));
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });

  it('test DELETE_SINGLE_BOOKMARK when authenticated', async (done) => {
    const data = {
      message: 'Success!',
      id: 1,
    };

    const expectedActions = actions.deleteBookmarkSuccessMessage(data.id);

    moxios.stubRequest(`${API_HOST}/bookmarks/${data.id}/`, {
      status: 200,
      response: {
        bookmark: {
          message: 'Success!',
          id: 1,
        },
      },
    });

    await store.dispatch(actions.unBookmarkArticle(data.id));
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });

  it('test ERROR_FETCHING_ARTICLES when authenticated', async (done) => {
    const data = {
      message: 'Error!',
      id: 1,
    };

    const expectedActions = errorMessage(data);

    moxios.stubRequest(`${API_HOST}/bookmarks/${data.id}/`, {
      status: 404,
      response: {
        message: 'Error!',
        id: 1,
      },
    });

    await store.dispatch(actions.unBookmarkArticle(data.id));
    expect(store.getActions()).toEqual([expectedActions]);
    done();
  });
});
