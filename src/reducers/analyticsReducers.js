import {
  STATS_LOADING_PROGRESS,
  FETCH_MY_ARTICLE_VIEWS,
  FETCH_ALL_MY_VIEWS,
  ERROR_FETCHING_STATS,
} from '../actions/types';

const INITIAL_STATE = {
  myArticleViews: [],
  myArticleViewsCount: 0,
  views: [],
  viewsCount: 0,
  errorMessage: {},
  loading: false,
};

export default function (state = INITIAL_STATE, actions) {
  switch (actions.type) {
    case STATS_LOADING_PROGRESS:
      return {
        ...state,
        loading: true,
      };
    case FETCH_MY_ARTICLE_VIEWS:
      return {
        ...state,
        myArticleViews: actions.payload.views,
        myArticleViewsCount: actions.payload.viewsCount,
        errorMessage: {},
        loading: false,
      };
    case FETCH_ALL_MY_VIEWS:
      return {
        ...state,
        views: actions.payload.views,
        viewsCount: actions.payload.viewsCount,
        errorMessage: {},
        loading: false,
      };
    case ERROR_FETCHING_STATS:
      return {
        ...state,
        errorMessage: actions.payload,
        loading: false,
      };
    default:
      return state;
  }
}
