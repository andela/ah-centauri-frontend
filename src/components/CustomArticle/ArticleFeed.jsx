import React from 'react';
import PropTypes from 'prop-types';
import ArticleItem from './ArticleItem';

const ArticleFeed = ({ articles }) => articles.map(article => <ArticleItem article={article} key={article.id}/>);

ArticleFeed.defaultProps = {
  articles: [],
};

ArticleFeed.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.array.isRequired,
};
export default ArticleFeed;
