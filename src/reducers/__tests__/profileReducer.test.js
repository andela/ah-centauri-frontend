import reducer from '../profileReducer';
import {
  GET_MY_PROFILE_ERROR,
  GET_MY_PROFILE_SUCCESS,
  UPDATE_MY_PROFILE_ERROR,
  UPDATE_MY_PROFILE_SUCCESS,
} from '../../actions/types';
import setUpProfileTests from '../../setupTests';

const testResponseData = {
  message: 'Your Profile details.',
  profile: {
    username: 'ah_user7',
    first_name: null,
    last_name: null,
    bio: '',
    image: 'image/upload/t_media_lib_thumb/v1554230107/samples/people/boy-snow-hoodie.jpg',
    image_url: 'https://res.cloudinary.com/daniel2019/image/upload/c_fill,h_150,w_100/v1/t_media_lib_thumb/v1554230107/samples/people/boy-snow-hoodie',
    my_highlights: [
      {
        article: {
          title: 'The Best Story',
          slug: 'the-best-story-1',
        },
        totalHighlights: 1,
      },
      {
        article: {
          title: 'The Best Story',
          slug: 'the-best-story',
        },
        totalHighlights: 2,
      },
    ],
    website: '',
    city: '',
    phone: 0,
    country: '',
    highlights_on_my_articles: [],
  },
};

describe('profileReducer', () => {
  const {  updateProfileSuccessResponse, initialProfileState, } = setUpProfileTests();
  it('should return the initial state of the Profile reducer', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        current_profile: {},
        errorMessage: {},
        message: '',
        loading: false,
      },
    );
  });

  it(`Profile reducer should handle ${GET_MY_PROFILE_SUCCESS}`, () => {
    expect(reducer({}, {
      type: GET_MY_PROFILE_SUCCESS,
      payload: testResponseData,
    })).toEqual({
      current_profile: testResponseData.profile,
      message: testResponseData.message,
      errorMessage: {},
      loading: false,
    });
  });

  it(`Profile reducer should handle ${GET_MY_PROFILE_ERROR}`, () => {
    expect(reducer({}, {
      type: GET_MY_PROFILE_ERROR,
      payload: { errors: { detail: 'Authentication credentials were not provided.' } },
    })).toEqual({
      current_profile: undefined,
      errorMessage: { errors: { detail: 'Authentication credentials were not provided.' } },
      message: '',
      loading: false,
    });
  });
  it(`Profile reducer should handle ${UPDATE_MY_PROFILE_SUCCESS}`, () => {
    expect(reducer({}, {
      type: UPDATE_MY_PROFILE_SUCCESS,
      payload: updateProfileSuccessResponse,
    })).toEqual({
      current_profile: updateProfileSuccessResponse.user.profile,
      message: updateProfileSuccessResponse.message,
      errorMessage: {},
      loading: false,
    });
  });

  it(`Profile reducer should handle ${UPDATE_MY_PROFILE_ERROR}`, () => {
    expect(reducer({}, {
      type: UPDATE_MY_PROFILE_ERROR,
      payload: { errors: { detail: 'Authentication credentials were not provided.' } },
    })).toEqual({
      current_profile: undefined,
      errorMessage: { errors: { detail: 'Authentication credentials were not provided.' } },
      message: '',
      loading: false,
    });
  });
});
