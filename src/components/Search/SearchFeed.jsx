import React from 'react';
import PropTypes from 'prop-types';
import SearchItem from './SearchItem';


const SearchFeed = ({ articles }) => articles.map(article => <SearchItem article={article} key={article.id}/>);


SearchFeed.defaultProps = {
  articles: [],
};

SearchFeed.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.array.isRequired,
};
export default SearchFeed;
