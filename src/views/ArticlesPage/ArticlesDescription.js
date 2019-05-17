import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderLayout from '../../components/layout/HeaderLayout';
import Footer from '../../components/layout/Footer';
import {
  getAllArticles,
  getSingleArticles,
  getAllbookmarkedArticles,
} from '../../actions/articlesActions';

import SideBar from '../../components/layout/SideBar';
import SingleArticleItem from '../../components/CustomArticle/SingleArticleItem';

export class ArticlesDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      articles: [],
      bookmarks: [],
    };
  }

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

  componentDidMount() {
    const { slug } = this.props.match.params;
    this.props.getAllArticles();
    this.props.getAllbookmarkedArticles();
    this.props.getSingleArticles(slug, this.props.history);
  }

  render() {
    const { articles, article, bookmarks } = this.state;

    return (
      <section id="home">
        <HeaderLayout />
        <div className="row home">
          <div className="column _25">
            <SingleArticleItem
              article={article}
              key={article.id}
              bookmarks={bookmarks}
              authenticated={this.props.authenticated}
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
};

ArticlesDescription.propTypes = {
  articles: PropTypes.array,
  bookmarks: PropTypes.array,
  article: PropTypes.object,
  authenticated: PropTypes.bool,
  getAllArticles: PropTypes.func.isRequired,
  getSingleArticles: PropTypes.func.isRequired,
  getAllbookmarkedArticles: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ articles, bookmarks, auth }) => ({
  articles: articles.articles,
  authenticated: auth.authenticated,
  article: articles.article,
  bookmarks: bookmarks.bookmarks,
  loading: articles.loading,
});

export default connect(
  mapStateToProps,
  { getAllArticles, getSingleArticles, getAllbookmarkedArticles },
)(ArticlesDescription);
