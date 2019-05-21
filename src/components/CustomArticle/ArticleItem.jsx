import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import parse from 'html-react-parser';
import classNames from 'classnames';

import CircularSocial from '../SocialShareLinks/SocialShareLinks';
import {
  bookmarkArticle,
  unBookmarkArticle,
} from '../../actions/bookmarksActions';
import isEmpty from '../../utils/is_empty';

export class ArticleItem extends Component {
  handleBookmark = (e, slug) => {
    e.preventDefault();

    this.props.bookmarkArticle(slug);
  };

  handleUnBookmark = (e, id) => {
    e.preventDefault();

    this.props.unBookmarkArticle(id);
  };

  render() {
    const { article, authenticated, bookmarks } = this.props;

    const bookmarked = bookmarks.filter(bookmark => bookmark.article.slug === article.slug);

    return (
      <article className="post post_item">
        <div className="post-container">
          <div className="post-categories-container">
            <div className="post-categories">
              {article.tags.map((tag, index) => (
                <Link to="#" key={index} className="post-tags-item post-tags-item-title">
                  #
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          <h2 className="post-title">
            <a
              href={`/article/${article.slug}`}
            >
              {article.title}
            </a>
            <span
              className={classNames({ 'post-read-later': true, 'post-read-later-guest': authenticated })}
              onClick={e => (isEmpty(bookmarked) ? this.handleBookmark(e, article.slug) : this.handleUnBookmark(e, bookmarked[0].id))}
            >
              <i
                className={classNames({
                  'fa fa-bookmark-o': isEmpty(bookmarked),
                  'fa fa-bookmark': !isEmpty(bookmarked),
                })}
                aria-hidden="true"
              />
            </span>
          </h2>
          <div className="post-meta">
            <div className="post-meta-content">
              <span className="post-author-date">
                <span>
                  <Link to="#" className="post-author">{article.author.username}</Link>
                </span>
            ,&nbsp;
                <Link to="#" className="post-date">
                  {moment(article.created_at).format('MMM Do YY')}
                  {' '}
                </Link>
              </span>
              <Link to="#" className="post-comments">
                <i className="fa fa-heart-o"/>
                {article.likes}
              </Link>
              <span className="post-readtime">
                <i className="fa fa-clock-o"/>
                {article.read_time}
              </span>
            </div>
          </div>
          <div className="post-thumbnail">
            <img
              width="1200"
              height="675"
              src="https://cdn.gillion.shufflehound.com/wp-content/uploads/2017/01/26-1200x675.jpg"
              alt=""
            />
            <a href={`/article/${article.slug}`} className="post-overlay">
              <div className="post-overlay-content">
                <span/>
                <span/>
                <span/>
              </div>
            </a>
          </div>
          <div className="post-content-container">
            <div className="post-content">
              <p>
                {parse(article.description)}
              </p>
            </div>
          </div>
          <div className="post-readmore sh-table">
            <div className="sh-table-cell post-readmore-text">
              <a href={`/article/${article.slug}`}>
                <h6>Read more</h6>
              </a>
            </div>
            <div className="sh-table-cell post-readmore-line">
              <div className="post-readmore-line-content"/>
            </div>
            <div className="sh-table-cell">
              <div
                className="post-content-share post-content-share-side jssocials"
              >
                <div className="jssocials-shares">
                  <CircularSocial size="large" shareLinks={article.share_links}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

ArticleItem.defaultProps = {
  article: {},
  bookmarks: [],
  authenticated: false,
};


ArticleItem.propTypes = {
  article: PropTypes.object.isRequired,
  bookmarks: PropTypes.array.isRequired,
  authenticated: PropTypes.bool,
  bookmarkArticle: PropTypes.func.isRequired,
  unBookmarkArticle: PropTypes.func.isRequired,
};

export default connect(null, { bookmarkArticle, unBookmarkArticle })(ArticleItem);
