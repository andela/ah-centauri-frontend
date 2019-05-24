import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { deleteArticle } from '../../actions/articlesActions';

export class MyArticleDraftItem extends Component {
  handleArticleDelete = (event) => {
    event.preventDefault();

    this.props.deleteArticle(this.props.article.slug);
  };

  render() {
    const { article, loading } = this.props;

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
                    <Link
                      to={`/article/${article.slug}/edit`}
                      className="jssocials-share-link"
                    >
                      <i
                        className="fa fa-pencil jssocials-share-logo"
                      />
                    </Link>
                  </div>
                  <div className="jssocials-share jssocials-share-trash">
                    <Link
                      to="#"
                      className="jssocials-share-link"
                      onClick={this.handleArticleDelete}
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
  loading: false,
};

MyArticleDraftItem.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  article: PropTypes.object,
  loading: PropTypes.bool,
  deleteArticle: PropTypes.func.isRequired,
};

export default connect(null, { deleteArticle })(MyArticleDraftItem);
