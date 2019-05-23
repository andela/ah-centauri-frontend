import {
  STATS_LOADING_PROGRESS,
  FETCH_MY_ARTICLE_VIEWS,
  FETCH_ALL_MY_VIEWS,
  ERROR_FETCHING_STATS,
} from './types';
import { api } from '../services/Api';
import { loadingMessage } from './articlesActions';


export const statsMessage = (type, payload) => ({
  type,
  payload,
});

export const getMyViewedArticleStats = () => (dispatch) => {
  dispatch(loadingMessage(STATS_LOADING_PROGRESS));
  return api.analytics.getMyViewedArticleStats()
    .then((response) => {
      dispatch(statsMessage(FETCH_ALL_MY_VIEWS, response.data));
    })
    .catch((error) => {
      dispatch(statsMessage(ERROR_FETCHING_STATS, error.response.data));
    });
};

export const getMyArticleViewsStats = () => (dispatch) => {
  dispatch(loadingMessage(STATS_LOADING_PROGRESS));
  return api.analytics.getMyArticleViewsStats()
    .then((response) => {
      dispatch(statsMessage(FETCH_MY_ARTICLE_VIEWS, response.data));
    })
    .catch((error) => {
      dispatch(statsMessage(ERROR_FETCHING_STATS, error.response.data));
    });
};
