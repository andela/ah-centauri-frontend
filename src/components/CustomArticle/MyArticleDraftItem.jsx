import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { deleteArticle } from '../../actions/articlesActions';

class MyArticleDraftItem extends Component {
  handleArticleDelete = (slug) => {
    this.props.deleteArticle(slug);
  };

  render() {
    const { article } = this.props;

    return (
      <div className="column">
        <div className="articles-draft-tab-content-item">
          <div classsName="articles-draft-tab-content-item__image">
            <img src="" alt="" />
          </div>
          <div className="articles-draft-tab-content-item__content">
            <a href={`/article/${article.slug}`}>
              <h3>{article.title}</h3>
            </a>
            <p>{article.description}</p>
          </div>

          <div className="p-3">
            Published &nbsp;
            {moment(article.created_at).format('MMM Do YY')}
            &nbsp;&nbsp;|&nbsp;&nbsp;
            {article.read_time}
          </div>
          <div className="post-readmore sh-table">
            <div className="sh-table-cell post-readmore-text">
              <Link to={`/article/${article.slug}`}>
                <h6>Read more</h6>
              </Link>
            </div>
            <div className="sh-table-cell post-readmore-line">
              <div className="post-readmore-line-content" />
            </div>
            <div className="sh-table-cell">
              <div
                className="post-content-share post-content-share-side jssocials"
              >
                <div className="jssocials-shares">
                  <div className="jssocials-share jssocials-share-pencil">
                    <a
                      to="#"
                      className="jssocials-share-link"
                    >
                      <i
                        className="fa fa-pencil jssocials-share-logo"
                      />
                    </a>
                  </div>
                  <div className="jssocials-share jssocials-share-trash">
                    <Link
                      to="#"
                      className="jssocials-share-link"
                      onClick={this.handleArticleDelete(article.slug)}
                    >
                      <i
                        className="fa fa-trash jssocials-share-logo"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MyArticleDraftItem.defautProps = {
  article: {},
};

MyArticleDraftItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  article: PropTypes.object.isRequired,
  deleteArticle: PropTypes.func.isRequired,
};

export default connect(
  {},
  { deleteArticle },
)(MyArticleDraftItem);
