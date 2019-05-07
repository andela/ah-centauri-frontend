import {
  AUTH_ERROR,
  AUTH_SUCCESS,
  LOADING_PROGRESS,
} from '../actions/types';
import isEmpty from '../utils/is_empty';

const INITIAL_STATE = {
  authenticated: false,
  errorMessage: {},
  successMessage: '',
  loading: false,
};

export default function (state = INITIAL_STATE, actions) {
  switch (actions.type) {
    case LOADING_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        authenticated: !isEmpty(actions.payload.token),
        successMessage: actions.payload.message,
        errorMessage: {},
        loading: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        authenticated: false,
        errorMessage: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
