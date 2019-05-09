import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { API_HOST } from '../../services/Api';

import * as actions from '../articlesActions';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const store = mockStore();


describe('Test Article axios actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
    store.clearActions();
  });

  it(' that creates a single article using action FETCH_ALL_ARTICLES', async (done) => {
    const data = {
      articles: {
        id: 1,
      },
    };

    const expectedActions = actions.successMessage(data.article);

    moxios.stubRequest(`${API_HOST}/articles`, {
      status: 200,
      response: { data },
    });

    const payload = {
      article: {
        title: 'the 3 musketeers',
        body: 'is a very good story',
        description: 'was not written by me',
        tags: [],
      },
    };

    await store.dispatch(actions.getAllArticles(payload));
    expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });
});
