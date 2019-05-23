import axios from 'axios/index';

// Backend API URL
export const API_HOST = 'https://ah-centauri-backend-staging.herokuapp.com/api';

const limit = (count, p) => `limit=${count}&offset=${p ? (p - 1) * count : 0}`;

// eslint-disable-next-line import/prefer-default-export
export const api = {
  user: {
    signup: data => axios.post(`${API_HOST}/users/`, data),
    login: data => axios.post(`${API_HOST}/users/login/`, data),
    loginSocial: data => axios.post(`${API_HOST}/users/${data.url}/`, data.payload),
    resetPasswordLink: data => axios.post(`${API_HOST}/users/password_reset/`, data),
    resetPassword: data => axios.patch(`${API_HOST}/users/password_reset/${data.token}/`, data.resetData),
    verifyEmail: data => axios.get(`${API_HOST}/verify-email/${data.token}/${data.uid}/`),
  },
  profile: {
    getMyProfile: () => axios.get(`${API_HOST}/profiles/me/`),
    updateMyProfile: data => axios.patch(`${API_HOST}/user/`, data),
  },
  articles: {
    getAllArticles: page => axios.get(`${API_HOST}/articles/?${limit(10, page)}`),
    getSingleArticles: slug => axios.get(`${API_HOST}/articles/${slug}`),
    createArticles: data => axios.post(`${API_HOST}/articles/`, data),
    updateArticles: data => axios.put(`${API_HOST}/articles/${data.slug}/`, data),
    filterByAuthorArticles: username => axios.get(`${API_HOST}/articles/q?author=${username}`),
    deleteArticle: slug => axios.delete(`${API_HOST}/articles/${slug}`),
    likeArticle: slug => axios.post(`${API_HOST}/articles/${slug}/like/`),
    dislikeArticle: slug => axios.post(`${API_HOST}/articles/${slug}/dislike/`),
    updateArticleRating: data => axios.post(`${API_HOST}/articles/${data.rating.slug}/ratings/`, data),
    searchArticles: data => axios.get(`${API_HOST}/articles/q?${data.key}=${data.value}`),
  },
  bookmarks: {
    getAllBookmarkArticle: () => axios.get(`${API_HOST}/bookmarks/`),
    bookmarkArticle: slug => axios.post(`${API_HOST}/bookmarks/${slug}/`),
    unBookmarkArticle: id => axios.delete(`${API_HOST}/bookmarks/${id}/`),
  },
  notifications: {
    getUserNotifications: () => axios.get(`${API_HOST}/notification/settings`),
    updateNotifications: data => axios.patch(`${API_HOST}/notification/settings`, data),
  },
};
