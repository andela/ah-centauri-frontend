import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ArticleFeed from '../../components/CustomArticle/ArticleFeed';
import Header from '../../components/layout/HeaderLayout';
import Footer from '../../components/layout/Footer';

import {
  getAllArticles,
  getAllbookmarkedArticles
} from '../../actions/articlesActions';
import SideBar from '../../components/layout/SideBar';
import { setPage } from '../../actions/paginationActions'

export class HomePage extends Component {
  componentDidMount() {
    this.props.getAllArticles(this.props.currentPage);
    this.props.getAllbookmarkedArticles();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.currentPage !== prevProps.currentPage) {
      this.props.getAllArticles(this.props.currentPage);
      this.props.getAllbookmarkedArticles();
    }
  }


  onSetPage = page => {
    this.props.setPage(page);
  };

  render() {
    const { articles, authenticated, bookmarks } = this.props;

    return (
      <section id="home">
        <Header />
        <div className="row home">
          <div className="column _25">
            <div className="articles">
              <div className="sidebar-subscribe--title">
                <h3>RECENT POSTS</h3>
              </div>
              <ArticleFeed
                articles={this.props.articles}
                articlesCount={this.props.articlesCount}
                currentPage={this.props.currentPage}
                onSetPage={this.onSetPage}
                authenticated={authenticated}
                bookmarks={bookmarks}
              />
            </div>
          </div>
          <div className="column _75">
            <SideBar articles={articles} authenticated={authenticated} bookmarks={bookmarks}/>
          </div>
        </div>
        <Footer />
      </section>
    );
  }
}

HomePage.defautProps = {
  articles: [],
  bookmarks: [],
};

HomePage.propTypes = {
  articles: PropTypes.array,
  bookmarks: PropTypes.array,
  articlesCount: PropTypes.number,
  currentPage: PropTypes.number,
  authenticated: PropTypes.bool,
  getAllArticles: PropTypes.func.isRequired,
  getAllbookmarkedArticles: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ articles, auth, bookmarks }) => ({
  authenticated: auth.authenticated,
  articles: articles.articles,
  articlesCount: articles.articlesCount,
  currentPage: articles.currentPage,
  bookmarks: bookmarks.bookmarks,
});

export default connect(
  mapStateToProps,
  { getAllArticles, setPage, getAllbookmarkedArticles },
)(HomePage);

export const _HomePage = HomePage;
