import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderLayout from '../../components/layout/HeaderLayout';
import Footer from '../../components/layout/Footer';
import {
  getAllArticles,
  getSingleArticles,
} from '../../actions/articlesActions';
import {
  getAllbookmarkedArticles,
} from '../../actions/bookmarksActions';

import SideBar from '../../components/layout/SideBar';
import SingleArticleItem from '../../components/CustomArticle/SingleArticleItem';
import {
  getAllComments,
  getAllReplies,
  createComment,
  deleteComment,
  editComment,
  postReply,
} from '../../actions/commentsActions';

export class ArticlesDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      articles: [],
      bookmarks: [],
    };
  }

  componentDidMount() {
    const { slug } = this.props.match.params;

    this.props.getAllArticles();
    this.props.getSingleArticles(slug, this.props.history);
    this.props.getAllbookmarkedArticles();
    this.props.getAllComments(slug);
  }

  getAllReplies = (data) => {
    this.props.getAllReplies(data);
  }

  createComment = (data) => {
    this.props.createComment(data);
  };

  deleteComment = (data) => {
    this.props.deleteComment(data);
  };

  editComment = (data) => {
    this.props.editComment(data);
  };

  postReply = (data) => {
    this.props.postReply(data);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.article !== prevState.article
      || nextProps.articles !== prevState.articles
      || nextProps.bookmarks !== prevState.bookmarks
    ) {
      return {
        article: nextProps.article,
        articles: nextProps.articles,
        bookmarks: nextProps.bookmarks,
      };
    }
    return null;
  }


  render() {
    const { articles, article, bookmarks } = this.state;

    return (
      <section id="home">
        <HeaderLayout />
        <div className="row home">
          <div className="column _25">
            <SingleArticleItem
              loading={this.props.loading}
              article={article}
              key={article.id}
              comments={this.props.comments}
              getReplies={this.getAllReplies}
              createComment={this.createComment}
              deleteComment={this.deleteComment}
              editComment={this.editComment}
              postReply={this.postReply}
              bookmarks={bookmarks}
              authenticated={this.props.authenticated}
              user={this.props.user ? this.props.user.username : ''}
            />
          </div>
          <div className="column _75">
            <SideBar
              articles={articles}
              authenticated={this.props.authenticated}
              bookmarks={bookmarks}
            />
          </div>
        </div>
        <Footer />
      </section>
    );
  }
}

ArticlesDescription.defautProps = {
  articles: [],
  bookmarks: [],
  article: {},
  authenticated: false,
  loading: false,
};

ArticlesDescription.propTypes = {
  articles: PropTypes.array,
  bookmarks: PropTypes.array,
  article: PropTypes.object,
  authenticated: PropTypes.bool,
  comments: PropTypes.array,
  user: PropTypes.string,
  loading: PropTypes.bool,
  getAllArticles: PropTypes.func.isRequired,
  getAllReplies: PropTypes.func.isRequired,
  getSingleArticles: PropTypes.func.isRequired,
  getAllbookmarkedArticles: PropTypes.func.isRequired,
  getAllComments: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
};

export const mapStateToProps = ({
  articles, bookmarks, auth, comments, profile,
}) => ({
  articles: articles.articles,
  authenticated: auth.authenticated,
  article: articles.article,
  bookmarks: bookmarks.bookmarks,
  comments: comments.comments,
  user: profile.current_profile,
  loading: articles.loading,
});

export default connect(
  mapStateToProps,
  {
    getAllArticles,
    getSingleArticles,
    getAllbookmarkedArticles,
    getAllComments,
    getAllReplies,
    createComment,
    deleteComment,
    editComment,
    postReply,
  },
)(ArticlesDescription);
