import {
  AUTH_SIGNOUT,
  GET_MY_PROFILE_ERROR,
  GET_MY_PROFILE_SUCCESS,
  PROFILE_LOADING_PROGRESS,
  UPDATE_MY_PROFILE_ERROR,
  UPDATE_MY_PROFILE_SUCCESS,
  GET_SINGLE_PROFILE_SUCCESS,
  UPDATE_MY_PROFILE_FOLLOW_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  profile: {},
  current_profile: undefined,
  errorMessage: {},
  message: '',
  loading: false,
};

export default function (state = INITIAL_STATE, actions) {
  switch (actions.type) {
    case PROFILE_LOADING_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case GET_MY_PROFILE_SUCCESS:
      // The payload should have a message string and Profile JSON object on success
      return {
        ...state,
        loading: false,
        current_profile: actions.payload.profile,
        message: actions.payload.message,
        errorMessage: {},
      };
    case GET_MY_PROFILE_ERROR:
      // In case of an error the payload should have a JSON with error details
      //  i.e an 'errors' key with necessary error string or array of errors or
      //  'detail' key with error detail
      return {
        ...state,
        loading: false,
        current_profile: undefined,
        errorMessage: actions.payload,
        message: '',
      };
    case UPDATE_MY_PROFILE_SUCCESS:
      // The payload should have a message string and Profile JSON object on success
      return {
        ...state,
        loading: false,
        current_profile: actions.payload.user.profile,
        message: actions.payload.message,
        errorMessage: {},
      };
    case UPDATE_MY_PROFILE_ERROR:
      // In case of an error the payload should have a JSON with error details
      //  i.e an 'errors' key with necessary error string or array of errors or
      //  'detail' key with error detail
      return {
        ...state,
        loading: false,
        errorMessage: actions.payload,
        message: '',
      };
    case AUTH_SIGNOUT:
      return {
        ...state,
        current_profile: undefined,
      };
    case UPDATE_MY_PROFILE_FOLLOW_SUCCESS:
      // The payload should have a message string and Profile JSON object on success
      return {
        ...state,
        loading: false,
        profile: { ...state.profile, ...actions.payload },
        message: actions.payload.message,
        errorMessage: {},
      };
    case GET_SINGLE_PROFILE_SUCCESS:
      // The payload should have a message string and Profile JSON object on success
      return {
        ...state,
        profile: actions.payload.profile,
        message: '',
        errorMessage: {},
        loading: false,
      };
    default:
      return state;
  }
}
