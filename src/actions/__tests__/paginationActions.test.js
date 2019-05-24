import expect from 'expect';
import {SET_PAGE} from '../types';
import * as actions from '../paginationActions';

describe('Pagination Actions', () => {
  it('should handle set page action', () => {
    const page = 2;
    const paginateAction = actions.setPage(page);
    const expectedAction = {
      type: SET_PAGE,
      payload: page,
    };
    expect(paginateAction).toEqual(expectedAction);
  });

});