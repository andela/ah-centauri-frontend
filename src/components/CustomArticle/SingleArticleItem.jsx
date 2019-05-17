import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';
import LikeDislikeButtons from '../like/like';
import CircularSocial from '../SocialShareLinks/SocialShareLinks';
import SocialShareLinksVertical from '../SocialShareLinks/SocialShareLinksVertical';

const SingleArticleItem = ({ article }) => (
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

            <LikeDislikeButtons article={article} />
            <SocialShareLinksVertical shareLinks={article.share_links ? article.share_links : {}} />

          </div>
        </div>
        <div className="post-single-meta">
          <div className="post-categories-container">
            <div className="post-categories">
              {article.tags ? article.tags.map((tag, index) => <Link to="#" key={index}>{tag}</Link>) : 'loading ....'}
            </div>
          </div>
          <a className="post-title">
            <h1>
              {article.title}
              &nbsp;
              <span
                className="post-read-later post-read-later-guest tooltipstered"
                href="#"
                data-type="add"
                data-id="57"
              >
                <i className="fa fa-bookmark-o" />
              </span>
            </h1>
          </a>
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
                  {article.created_at}
                </a>
              </span>
              <span className="post-readtime">
                <i className="icon icon-clock" />
                {article.read_time}
              </span>
              <span
                className="responsive-post-read-later"
              >
                &nbsp;
                <span
                  className="post-read-later post-read-later-guest tooltipstered"
                  href="#"
                  data-type="add"
                  data-id="57"
                >
                  <i className="fa fa-bookmark-o" />
                </span>
              </span>
            </div>
          </div>
        </div>
        <div className="post-content">
          <div style={{ color: 'black' }}>
            {article.body ? parse(`<p>${article.body}</p>`) : 'Loading  😀 .....'}
          </div>
          <div className="sh-clear" />
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
            <CircularSocial size="huge" shareLinks={article.share_links? article.share_links : {}} />
          </div>
        </div>
        <div className="sidebar-subscribe--title" style={{ paddingTop: '4rem' }}>
          <h3>1 Comments</h3>
        </div>
      </div>

    </article>
  </div>
);


SingleArticleItem.defaultProps = {
  article: {},
};

SingleArticleItem.propTypes = {
  article: PropTypes.object.isRequired,
};

export default SingleArticleItem;
