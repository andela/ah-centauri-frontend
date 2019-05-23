import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import parse from 'html-react-parser';
import classNames from 'classnames';

import LikeDislikeButtons from '../like/like';
import CircularSocial from '../SocialShareLinks/SocialShareLinks';
import SocialShareLinksVertical from '../SocialShareLinks/SocialShareLinksVertical';
import ArticleRating from '../ArticleRating/ArticleRating';
import {
  bookmarkArticle,
  unBookmarkArticle,
} from '../../actions/bookmarksActions';
import isEmpty from '../../utils/is_empty';

export class SingleArticleItem extends Component {
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
      <div className="blog-single blog-style-single">
        <article className="post-item post-item-single">
          <div className="post-type-content">
            <div className="post-thumbnail">
              <img
                src="https://cdn.gillion.shufflehound.com/wp-content/uploads/2016/01/Main_slide-1050x675.jpg"
                alt="Lesson 1: Basics Of Photography With Natural Lighting"
              />
              <a
                href="https://cdn.gillion.shufflehound.com/wp-content/uploads/2016/01/Main_slide.jpg"
                className="post-lightbox"
                data-rel="lightcase:post_gallery_57"
              />
            </div>
          </div>
          <div className="post-item-single-container">
            <div className="post-content-share post-content-share-bar jssocials sticky">
              <div className="jssocials-shares post-content-single-share-jssocials-shares">

                <LikeDislikeButtons article={article}/>
                <SocialShareLinksVertical shareLinks={article.share_links ? article.share_links : {}}/>
                <div className="jssocials-share jssocials-share-like">
                  <a
                    target="_blank"
                    href=""
                    className="jssocials-share-link"
                  >
                    <i
                      className="fa fa-star jssocials-share-logo"
                    />
                    <span>
                      {article.average_rating}
                    </span>
                  </a>
                </div>

              </div>
            </div>
            <div className="post-single-meta">
              <div className="post-categories-container">
                <div className="post-categories">
                  {article.tags ? article.tags.map((tag, index) => (
                    <Link
                      to="#"
                      key={index}
                      className="post-tags-item post-tags-item-title"
                    >
                      #
                      {tag}
                    </Link>
                  )) : 'loading ....'}
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
                  <span className="post-auhor-date post-auhor-date-full">
                    <a href="#">
                      <img
                        alt=""
                        src="https://img.icons8.com/bubbles/2x/user.png"
                        className="avatar avatar-28 photo post-author-image"
                        height="40"
                        width="40"
                      />
                    </a>
                    <span>
                      <a
                        href="#"
                        className="post-author"
                      >
                        {article.author ? article.author.username : 'loading.....'}
                      </a>
                    </span>
                  ,
                    <a
                      href="#"
                      className="post-date"
                    >
                     {moment(article.created_at).format('MMM Do YY')}
                    </a>
                  </span>
                  <span className="post-readtime">
                    <i className="icon icon-clock"/>
                    {article.read_time}
                  </span>
                </div>
              </div>
            </div>
            <div className="post-content">
              <div style={{ color: 'black' }}>
                {article.body ? parse(`<p>${article.body}</p>`) : 'Loading  😀 .....'}
              </div>
              <p>{article.description}</p>

              <br/>
              <ArticleRating article={article}/>
              <div className="sh-clear"/>
              <div className="post-tags-container">
                <div className="post-tags">
                  {article.tags ? article.tags.map((tag, index) => (
                    <Link
                      to="#"
                      key={index.toString()}
                      className="post-tags-item post-tags-item-title"
                    >
                      #
                      {tag}
                    </Link>
                  )) : ''}
                </div>
              </div>
              <div className="social-share-circles">
                <CircularSocial size="huge" shareLinks={article.share_links ? article.share_links : {}}/>
              </div>
            </div>
            <div className="sidebar-subscribe--title" style={{ paddingTop: '4rem' }}>
              <h3>1 Comments</h3>
            </div>
          </div>

        </article>
      </div>
    );
  }
}

SingleArticleItem.defaultProps = {
  article: {},
  bookmarks: [],
  authenticated: false,
};


SingleArticleItem.propTypes = {
  article: PropTypes.object.isRequired,
  bookmarks: PropTypes.array.isRequired,
  authenticated: PropTypes.bool,
  bookmarkArticle: PropTypes.func.isRequired,
  unBookmarkArticle: PropTypes.func.isRequired,
};


export default connect(null, { bookmarkArticle, unBookmarkArticle })(SingleArticleItem);
