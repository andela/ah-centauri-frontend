import expect from 'expect';
import reducer from '../articleRatingReducer';
import {
  updateRatingAction,
  articleRated,
  articleRateFailure,
} from '../../actions/ratingActions';
import reducers from '..';

const initialState = {
  value: 0,
  review: '',
  successMessage: '',
  errorMessage: '',
};

describe('Testing articlesRatingReducer', () => {
  it('should return the initial state', () => {
    const state = reducer(initialState, { type: ' ' });
    expect(state).toEqual(initialState);
  });

  it('should handle update article rating action', () => {
    const action = updateRatingAction({
      value: 4,
      review: 'updated review',
    });

    const state = reducer(initialState, action);
    const expectedState = {
      ...initialState,
      value: 4,
      review: 'updated review',
    };

    expect(state)
      .toEqual(expectedState);
  });

  it('should handle article rated action', () => {
    const action = articleRated({
      rating: {
        id: 1,
        value: 2,
        review: 'rated',
      },
    });

    const state = reducer(initialState, action);
    const expectedState = {
      ...initialState,
      value: 2,
      review: 'rated',
      id: 1,
    };

    expect(state)
      .toEqual(expectedState);
  });
});
