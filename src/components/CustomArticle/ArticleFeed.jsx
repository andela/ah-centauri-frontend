import React from 'react';
import PropTypes from 'prop-types';
import { Placeholder } from 'semantic-ui-react';
import ArticleItem from './ArticleItem';
import ArticlePagination from '../ArticlePagination/ArticlePagination';


const ArticleFeed = props => (
  <div>
    {props.articles.map(article => (
      <ArticleItem
        article={article}
        key={article.id}
        authenticated={props.authenticated}
        bookmarks={props.bookmarks}
        loading={props.loading}
      />
    ))}
    <div className="pagination">
      <ul className="page-numbers">
        <ArticlePagination
          articlesCount={props.articlesCount}
          currentPage={props.currentPage}
          onSetPage={props.onSetPage}
        />
      </ul>
    </div>
  </div>
);


ArticleFeed.defaultProps = {
  articles: [],
  bookmarks: [],
  authenticated: false,
  loading: false,
};

ArticleFeed.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.array.isRequired,
  bookmarks: PropTypes.array.isRequired,
  authenticated: PropTypes.bool,
  loading: PropTypes.bool,
};
export default ArticleFeed;
