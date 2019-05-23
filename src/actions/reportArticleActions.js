import { toast } from 'react-toastify';
import { REPORT_SUCCESS, REPORT_FAILED, REPORTED_ARTICLE, LOADING_REPORT } from './types';
import { api } from '../services/Api';
import { loadingMessage } from './articlesActions';

export function successMessage(responseData) {
  return { type: REPORT_SUCCESS, payload: responseData };
}
export function failureMessage(error) {
  return { type: REPORT_FAILED, payload: error };
}

export const reportAnArticleAction = data => (dispatch, history) => {
  dispatch(loadingMessage(LOADING_REPORT));
  return api.articles.reportAnArticle(data)
    .then((response) => {
      dispatch(successMessage(response.data));
    })
    .catch((error) => {
      dispatch(failureMessage(error.response.data));
    });
};

export default reportAnArticleAction;
