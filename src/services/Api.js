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
    getSingleProfile: username => axios.get(`${API_HOST}/profiles/${username}/`),
    getUserFollowers: username => axios.get(`${API_HOST}/profiles/follow/${username}/`),
    handleFollow: username => axios.post(`${API_HOST}/profiles/follow/${username}/`),
    handleUnFollow: username => axios.delete(`${API_HOST}/profiles/follow/${username}/`),
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
    reportAnArticle: data => axios.post(`${API_HOST}/articles/${data.slug}/reports/`, data),
  },
  bookmarks: {
    getAllBookmarkArticle: () => axios.get(`${API_HOST}/bookmarks/`),
    bookmarkArticle: slug => axios.post(`${API_HOST}/bookmarks/${slug}/`),
    removeBookmark: id => axios.delete(`${API_HOST}/bookmarks/${id}/`),
  },
  notifications: {
    getUserNotificationSettings: () => axios.get(`${API_HOST}/notification/settings`),
    updateNotificationSettings: data => axios.patch(`${API_HOST}/notification/settings`, data),
    fetchNotifications: page => axios.get(`${API_HOST}/me/notifications?page=${page}`),
    markAsRead: () => axios.patch(`${API_HOST}/me/notifications`),
  },
  comments: {
    getAllComments: slug => axios.get(`${API_HOST}/articles/${slug}/comments/`),
    getAllReplies: data => axios.get(`${API_HOST}/articles/${data.slug}/comments/?parent=${data.parent_id}`),
    createComment: data => axios.post(`${API_HOST}/articles/${data.slug}/comments/`, data.payload),
    deleteComment: data => axios.delete(`${API_HOST}/articles/${data.slug}/comments/${data.comment_id}/`),
    editComment: data => axios.patch(`${API_HOST}/articles/${data.slug}/comments/${data.comment_id}/`, data.payload),
    postReply: data => axios.post(`${API_HOST}/articles/${data.slug}/comments/`, data.payload),
    getSingleComment: data => axios.get(`${API_HOST}/articles/${data.slug}/comments/${data.id}/`),
    likeComment: id => axios.post(`${API_HOST}/articles/comments/${id}/like/`),
    dislikeComment: id => axios.post(`${API_HOST}/articles/comments/${id}/dislike/`),
  },
  analytics: {
    getMyViewedArticleStats: () => axios.get(`${API_HOST}/analytics`),
    getMyArticleViewsStats: () => axios.get(`${API_HOST}/analytics/me`),
  },
};
