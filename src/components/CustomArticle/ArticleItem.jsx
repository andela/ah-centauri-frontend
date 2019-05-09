import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';

const ArticleItem = ({ article }) => (
  <article className="post post_item">
    <div className="post-container">
      <div className="post-categories-container">
        <div className="post-categories">
          {article.tags.map(tag => <Link to="#">{tag}</Link>)}
        </div>
      </div>
      <Link
        to={`article/${article.slug}`}
        className="post-title"
      >
        <h2>
          {article.title}
          <span
            className="post-read-later post-read-later-guest"
            href="#"
            data-type="add"
            data-id="67"
          >
            <i className="fa fa-bookmark-o" aria-hidden="true" />
          </span>
        </h2>
      </Link>
      <div className="post-meta">
        <div className="post-meta-content">
          <span className="post-author-date">
            <span>
              <Link to="#" className="post-author">{article.author.username}</Link>
            </span>
            ,&nbsp;
            <Link to="#" className="post-date">{moment(article.created_at).format('MMM Do YY')}  </Link>
          </span>
          <Link to="#" className="post-comments">
            <i className="fa fa-heart-o" />
            {article.likes}
          </Link>
          <span className="post-readtime">
            <i className="fa fa-clock-o" />
            {article.read_time}
          </span>
          <span className="responsive-post-read-later">
            &nbsp;
            <span
              className="post-read-later post-read-later-guest tooltipstered"
              href="#"
              data-type="add"
              data-id="67"
            >
              <i className="fa fa-bookmark-o" />
            </span>
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
        <Link to={`article/${article.slug}`} className="post-overlay">
          <div className="post-overlay-content">
            <span />
            <span />
            <span />
          </div>
        </Link>
      </div>
      <div className="post-content-container">
        <div className="post-content">
          <p>
            {article.description}
          </p>
        </div>
      </div>
      <div className="post-readmore sh-table">
        <div className="sh-table-cell post-readmore-text">
          <Link to={`article/${article.slug}`}>
            <h6>Read more</h6>
          </Link>
        </div>
        <div className="sh-table-cell post-readmore-line">
          <div className="post-readmore-line-content" />
        </div>
        <div className="sh-table-cell">
          <div
            className="post-content-share post-content-share-side jssocials"
            data-url="#"
            data-title="New Cryptocurrency That Will Kill Of Bitcoin"
          >
            <div className="jssocials-shares">
              <div className="jssocials-share jssocials-share-twitter">
                <a
                  target="_blank"
                  href={article.share_links.twitter}
                  className="jssocials-share-link"
                >
                  <i
                    className="fa fa-twitter jssocials-share-logo"
                  />
                </a>
              </div>
              <div className="jssocials-share jssocials-share-facebook">
                <a
                  target="_blank"
                  href={article.share_links.facebook}
                  className="jssocials-share-link"
                >
                  <i
                    className="fa fa-facebook jssocials-share-logo"
                  />
                </a>
              </div>
              <div className="jssocials-share jssocials-share-googleplus">
                <a
                  target="_blank"
                  href={article.share_links.email}
                  className="jssocials-share-link"
                >
                  <i
                    className="fa fa-envelope-o jssocials-share-logo"
                  />
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
);

ArticleItem.propTypes = {
  article: PropTypes.object.isRequired,
};

export default ArticleItem;
