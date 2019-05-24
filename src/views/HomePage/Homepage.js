import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import { Placeholder } from 'semantic-ui-react';
import ArticleFeed from '../../components/CustomArticle/ArticleFeed';
import Header from '../../components/layout/HeaderLayout';
import Footer from '../../components/layout/Footer';

import {
  getAllArticles,
} from '../../actions/articlesActions';
import {
  getAllbookmarkedArticles,
} from '../../actions/bookmarksActions';
import SideBar from '../../components/layout/SideBar';
import { setPage } from '../../actions/paginationActions';

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


  onSetPage = (page) => {
    this.props.setPage(page);
  };

  render() {
    const {
      articles, authenticated, bookmarks, loading,
    } = this.props;

    return (
      <section id="home">
        <Header />
        <div className="row home">
          <div className="column _25">
            <div className="articles">
              <div className="sidebar-subscribe--title">
                <h3>RECENT POSTS</h3>
              </div>
              {loading ? _.map([1, 2, 3, 4], a => (
                  <div style={{ padding: '3rem 0' }}>
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
                  </div>

                ))
                : (
                  <ArticleFeed
                    articles={this.props.articles}
                    articlesCount={this.props.articlesCount}
                    currentPage={this.props.currentPage}
                    onSetPage={this.onSetPage}
                    authenticated={authenticated}
                    bookmarks={bookmarks}
                    loading={loading}
                  />
                )}
            </div>
          </div>
          <div className="column _75">
            <SideBar
              articles={articles}
              authenticated={authenticated}
              bookmarks={bookmarks}
              loading={loading}
            />
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
  loading: false,
};

HomePage.propTypes = {
  articles: PropTypes.array,
  bookmarks: PropTypes.array,
  articlesCount: PropTypes.number,
  currentPage: PropTypes.number,
  authenticated: PropTypes.bool,
  loading: PropTypes.bool,
  getAllArticles: PropTypes.func.isRequired,
  getAllbookmarkedArticles: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ articles, auth, bookmarks }) => ({
  authenticated: auth.authenticated,
  articles: articles.articles,
  articlesCount: articles.articlesCount,
  currentPage: articles.currentPage,
  loading: articles.loading,
  bookmarks: bookmarks.bookmarks,
});

export default connect(
  mapStateToProps,
  { getAllArticles, setPage, getAllbookmarkedArticles },
)(HomePage);

export const _HomePage = HomePage;
