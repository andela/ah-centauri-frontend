import React from 'react';
import PropTypes from 'prop-types';
import ArticleFeed from '../CustomArticle/ArticleFeed';


const SideBar = ({ articles, authenticated, bookmarks }) => (
  <div className="sidebar">
    <div className="sidebar-subscribe">
      <div className="sidebar-subscribe--title">
        <h3>Subscribe</h3>
      </div>
      <form className="sidebar-subscribe--form">
        <div className="sidebar-subscribe--form-fields">
          <p>
            <input type="email" name="EMAIL" placeholder="Your email address" required=""/>
          </p>
          <p>
            <input type="submit" value="Sign up"/>
          </p>
        </div>
      </form>
      <p className="sidebar-subscribe--description">
        * You will receive the latest news and updates on
        your favorite celebrities!
      </p>
    </div>
    <div className="sidebar-subscribe">
      <div className="sidebar-subscribe--title">
        <h3>EDITORS PICK</h3>
      </div>
      <ArticleFeed
        articles={articles.slice(0, 3)}
        articlesCount={4}
        authenticated={authenticated}
        bookmarks={bookmarks}
      />
    </div>
  </div>
);


SideBar.defaultProps = {
  articles: [],
  bookmarks: [],
  authenticated: false,
};

SideBar.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  articles: PropTypes.array.isRequired,
  bookmarks: PropTypes.array.isRequired,
  authenticated: PropTypes.bool,
};

export default SideBar;
