import { 
  LIKE_ARTICLE,
  DISLIKE_ARTICLE,
  GET_ARTICLE_DATA,
  LIKE_DISLIKE_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  currentArticle: {},
  liked: false,
  likes: 0,
  disliked: false,
  dislikes: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ARTICLE_DATA:
      return {
        ...state,
        currentArticle: action.payload,
        liked: action.payload.has_liked,
        disliked: action.payload.has_disliked,
        likes: action.payload.likes,
        dislikes: action.payload.dislikes,
      };
    case LIKE_ARTICLE:
      return {
        ...state,
        liked: !state.liked,
        disliked: false,
        likes: action.payload.like_count,
        dislikes: action.payload.dislike_count,
      };
    case DISLIKE_ARTICLE:
      return {
        ...state,
        liked: false,
        disliked: !state.disliked,
        likes: action.payload.like_count,
        dislikes: action.payload.dislike_count,
      };
    case LIKE_DISLIKE_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default: return state;
  }
};
