import { UPDATE_ARTICLE_RATING, ARTICLE_RATING_UPDATED } from '../actions/types';

const initialState = {
  value: 0,
  review: '',
  successMessage: '',
  errorMessage: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_ARTICLE_RATING:
      return {
        ...state,
        value: action.payload.value,
        review: action.payload.review,
      };
    case ARTICLE_RATING_UPDATED:

      const { rating } = action.payload;

      return {
        ...state,
        id: rating.id,
        review: rating.review,
        value: rating.value,
      };
    default:
      return state;
  }
}
