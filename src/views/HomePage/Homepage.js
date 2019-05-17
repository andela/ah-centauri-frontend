import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ArticleFeed from '../../components/CustomArticle/ArticleFeed';
import Header from '../../components/layout/HeaderLayout';
import Footer from '../../components/layout/Footer';

import { getAllArticles } from '../../actions/articlesActions';
import SideBar from '../../components/layout/SideBar';

export class HomePage extends Component {
  componentDidMount() {
    this.props.getAllArticles();
  }

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
              <ArticleFeed articles={articles} />
              <div className="pagination">
                <ul className="page-numbers">
                  <li><a className="page-numbers current" href="#">1</a></li>
                  <li><a className="page-numbers" href="#">2</a></li>
                  <li><a className="page-numbers" href="#">3</a></li>
                  <li><a className="page-numbers" href="#">4</a></li>
                  <li><a className="page-numbers" href="#">5</a></li>
                  <li><a className="next page-numbers" href="#">Next</a></li>
                </ul>
              </div>
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
  getAllArticles: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ articles }) => ({
  articles: articles.articles,
});

export default connect(
  mapStateToProps,
  { getAllArticles },
)(HomePage);
