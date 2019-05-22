import {
  FETCH_NOTIFICATIONS,
  LOADING_PROGRESS
} from '../actions/types';

const INITIAL_STATE = {
  notifications: {},
  errorMessage: {},
  loading: false,
};

export default function (state = INITIAL_STATE, actions) {
  switch (actions.type) {
    case LOADING_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_NOTIFICATIONS:
      return {
        ...state,
        notifications: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
