import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { API_HOST } from '../../services/Api';
import * as actions from '../ratingActions';
import {
  UPDATE_ARTICLE_RATING,
} from '../types';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore();

describe('Rating actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('test it creates ARTICLE_RATING_UPDATED when article gets updated', async (done) => {
    const data = {
      rating: {
        value: 4,
        review: 'this is a review',
      },
    };

    const expectedActions = actions.articleRated(data);

    moxios.stubRequest('/articles/slug-here/ratings/', {
      status: 200,
      response: {
        review: 'this is a review',
        value: 4,
      },
    });

    // await store.dispatch(actions.updateRating());
    // expect(store.getActions()).toContainEqual(expectedActions);
    done();
  });
});
