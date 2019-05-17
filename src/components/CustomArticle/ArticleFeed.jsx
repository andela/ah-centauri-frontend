import React from 'react';
import PropTypes from 'prop-types';
import ArticleItem from './ArticleItem';
import ArticlePagination from '../ArticlePagination/ArticlePagination'


const ArticleFeed = props => {
  return (
    <div>
      {
        props.articles.map(article => {
          return (
            <ArticleItem article={article} key={article.id}/>
          );
        })
      }
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
};


ArticleFeed.defaultProps = {
  articles: [],
};

ArticleFeed.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.array.isRequired,
};
export default ArticleFeed;
