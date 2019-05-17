import { 
  LIKE_ARTICLE,
  DISLIKE_ARTICLE,
  LOADING_PROGRESS,
  GET_ARTICLE_DATA
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
    case LOADING_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case GET_ARTICLE_DATA:
      return {
        ...state,
        currentArticle: action.payload,
        liked: action.payload.has_liked,
        disliked: action.payload.has_disliked,
        likes: action.payload.likes,
        dislikes: action.payload.dislikes,
        loading: false,
      };
    case LIKE_ARTICLE:
      return {
        ...state,
        liked: !state.liked,
        disliked: false,
        likes: action.payload.like_count,
        dislikes: action.payload.dislike_count,
        loading: false,
      };
    case DISLIKE_ARTICLE:
      return {
        ...state,
        disliked: !state.disliked,
        liked: false,
        likes: action.payload.like_count,
        dislikes: action.payload.dislike_count,
        loading: false,
      };
    default: return state;
  }
};
