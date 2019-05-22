import React from 'react';
import PropTypes from 'prop-types';
import ArticleFeed from '../CustomArticle/ArticleFeed';

const SideBar = ({ articles }) => (
  <div className="sidebar">
    <div className="sidebar-subscribe">
    </div>
    <div className="sidebar-subscribe">
      <div className="sidebar-subscribe--title">
        <h3>EDITORS PICK</h3>
      </div>
      <ArticleFeed
      articles={articles.slice(0, 3)}
      articlesCount = {4}
      />
    </div>
  </div>
);


SideBar.defaultProps = {
  articles: [],
};

SideBar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.array.isRequired,
};

export default SideBar;
