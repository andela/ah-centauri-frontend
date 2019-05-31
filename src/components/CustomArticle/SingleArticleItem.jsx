import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import parse from 'html-react-parser';
import classNames from 'classnames';

import _ from 'lodash';
import { Placeholder } from 'semantic-ui-react';
import LikeDislikeButtons from '../like/like';
import CircularSocial from '../SocialShareLinks/SocialShareLinks';
import SocialShareLinksVertical from '../SocialShareLinks/SocialShareLinksVertical';
import ArticleRating from '../ArticleRating/ArticleRating';
import CommentsComponent from '../Comments/Comments';
import {
  bookmarkArticle,
  removeBookmark,
} from '../../actions/bookmarksActions';
import isEmpty from '../../utils/is_empty';
import ReportArticleModal from '../ReportArticle/ReportArticleModal';

export class SingleArticleItem extends Component {
  handleBookmark = (e, slug) => {
    e.preventDefault();

    this.props.bookmarkArticle(slug);
  };

  handleUnBookmark = (e, id) => {
    e.preventDefault();

    this.props.removeBookmark(id);
  };

  render() {
    const {
      article,
      authenticated,
      bookmarks,
      comments,
      getReplies,
      createComment,
      deleteComment,
      editComment,
      postReply,
      user,
      loading,
    } = this.props;

    const imgRegex = /<img[^>]+src="(http:\/\/[^">]+)"/g;
    const src = imgRegex.exec(article.body);
    const imgSrc = _.isEmpty(src) ? '' : src[1];

    const bookmarked = bookmarks.filter(bookmark => bookmark.article.slug === article.slug);
    return (
      <div className="blog-single blog-style-single">
        <article className="post-item post-item-single">
          {/* ToDo: IMage */}
          {_.isEmpty(imgSrc) ? '' : (
            <div className="post-type-content">
              <div className="post-thumbnail">
                {loading ? (
                  <Placeholder>
                    <Placeholder.Image square/>
                  </Placeholder>
                ) : (
                  <img
                    src={imgSrc}
                    alt={article.title}
                    style={{ height: '40rem' }}
                  />
                )}
                <a
                  href={imgSrc}
                  className="post-lightbox"
                />
              </div>
            </div>
          )}
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
            {loading
              ? (
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
              )
              : (
                <div>
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
                        )) : ''}
                      </div>
                    </div>
                    <h2 className="post-title">
                      <a
                        href={`/article/${article.slug}`}
                      >
                        {article.title}
                      </a>
                      <span
                        className={classNames({
                          'post-read-later': true,
                          'post-read-later-guest': authenticated,
                        })}
                        onClick={e => (isEmpty(bookmarked)
                          ? this.handleBookmark(e, article.slug)
                          : this.handleUnBookmark(e, bookmarked[0].id))}
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
                        <span
                          className="post-author-date"
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
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
                            <Link
                              to={article.author ? `/profile/${article.author.username}` : '#'}
                              className="post-author"
                            >
                              {article.author ? article.author.username : ''}
                            </Link>
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
                    <span className="left-aligner">
                      <ReportArticleModal slug={article.slug}/>
                    </span>
                  </div>
                </div>
              )}
          </div>
          <CommentsComponent
              slug={article.slug}
              comments={comments}
              getReplies={getReplies}
              createComment={createComment}
              deleteComment={deleteComment}
              getEditHistory={getEditHistory}
              editComment={editComment}
              postReply={postReply}
              authenticated={authenticated}
              user={user}
          />
        </article>
      </div>
    );
  }
}

SingleArticleItem.defaultProps = {
  article: {},
  bookmarks: [],
  authenticated: false,
  loading: false,
  comments: [],
};


SingleArticleItem.propTypes = {
  article: PropTypes.object.isRequired,
  bookmarks: PropTypes.array.isRequired,
  authenticated: PropTypes.bool,
  loading: PropTypes.bool,
  bookmarkArticle: PropTypes.func.isRequired,
  removeBookmark: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
};


export default connect(null, { bookmarkArticle, removeBookmark })(SingleArticleItem);
