import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ArticleFeed from '../../components/CustomArticle/ArticleFeed';
import Header from '../../components/layout/HeaderLayout';
import Footer from '../../components/layout/Footer';

import { getAllArticles } from '../../actions/articlesActions';
import SideBar from '../../components/layout/SideBar';
import { setPage } from '../../actions/paginationActions'

export class HomePage extends Component {
  componentDidMount() {
    this.props.getAllArticles(this.props.currentPage);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.currentPage !== prevProps.currentPage) {
      this.props.getAllArticles(this.props.currentPage);
    }
  }
  

  onSetPage = page => {
    this.props.setPage(page)
  }; 

  render() {
    const { articles } = this.props;

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
              />
            </div>
          </div>
          <div className="column _75">
            <SideBar articles={articles}/>
          </div>
        </div>
        <Footer />
      </section>
    );
  }
}

HomePage.defautProps = {
  articles: [],
};

HomePage.propTypes = {
  articles: PropTypes.array,
  articlesCount: PropTypes.number,
  currentPage: PropTypes.number,
  getAllArticles: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ articles }) => ({
  articles: articles.articles,
  articlesCount: articles.articlesCount,
  currentPage: articles.currentPage,
});

export default connect(
  mapStateToProps,
  { getAllArticles, setPage },
)(HomePage);

export const _HomePage = HomePage;
