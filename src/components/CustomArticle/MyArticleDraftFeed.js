import React from 'react';
import PropTypes from 'prop-types';
import MyArticleDraftItem from './MyArticleDraftItem';

const MyArticleDraftFeed = ({ articles }) => articles.map(article => <MyArticleDraftItem article={article} />);

MyArticleDraftFeed.defaultProps = {
  articles: [],
};

MyArticleDraftFeed.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.array.isRequired,
};
export default MyArticleDraftFeed;
