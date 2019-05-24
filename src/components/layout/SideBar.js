import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Placeholder } from 'semantic-ui-react';
import ArticleFeed from '../CustomArticle/ArticleFeed';


const SideBar = ({ articles, authenticated, bookmarks, loading }) => (
  <div className="sidebar">
    <div className="sidebar-subscribe">
      <div className="sidebar-subscribe--title">
        <h3>EDITORS PICK</h3>
      </div>
      {loading ? _.map([1, 2, 3, 4], a => (
          <div style={{ padding: '3rem 0' }}>
            <Placeholder fluid>
              <Placeholder.Header image>
                <Placeholder.Line/>
                <Placeholder.Line/>
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line/>
                <Placeholder.Line/>
                <Placeholder.Line/>
              </Placeholder.Paragraph>
              <Placeholder.Paragraph>
                <Placeholder.Line/>
                <Placeholder.Line/>
                <Placeholder.Line/>
                <Placeholder.Line/>
                <Placeholder.Line/>
              </Placeholder.Paragraph>
            </Placeholder>
          </div>

        ))
        : (
          <ArticleFeed
            articles={articles.slice(0, 3)}
            articlesCount={4}
            authenticated={authenticated}
            bookmarks={bookmarks}
          />
        )}
    </div>
  </div>
);


SideBar.defaultProps = {
  articles: [],
  bookmarks: [],
  authenticated: false,
  loading: false,
};

SideBar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.array.isRequired,
  bookmarks: PropTypes.array.isRequired,
  authenticated: PropTypes.bool,
  loading: PropTypes.bool,
};

export default SideBar;
