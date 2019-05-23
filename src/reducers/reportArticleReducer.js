import { REPORT_SUCCESS, REPORT_FAILED, LOADING_REPORT } from '../actions/types';

export const initialState = {
  loading: false,
  report: {},
  errorMessage: {},
};

const reportArticleReducers = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_REPORT:
      return {
        ...state,
        loading: true,
      };
    case REPORT_SUCCESS:
      return {
        ...state,
        report: action.payload,
        errorMessage: {},
        loading: false,
      };
    case REPORT_FAILED:
      return {
        ...state,
        errorMessage: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default reportArticleReducers;
