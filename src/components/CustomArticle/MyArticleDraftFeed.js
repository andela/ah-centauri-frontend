import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import MyArticleDraftItem from './MyArticleDraftItem';

const MyArticleDraftFeed = ({ articles, loading }) => articles.map(article => (
  <MyArticleDraftItem
    article={article}
    loading={loading}
  />
));

MyArticleDraftFeed.defaultProps = {
  articles: [],
  loading: [],
};

MyArticleDraftFeed.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};
export default MyArticleDraftFeed;
