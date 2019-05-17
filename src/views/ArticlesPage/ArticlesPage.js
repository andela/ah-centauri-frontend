import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderLayout from '../../components/layout/HeaderLayout';
import Footer from '../../components/layout/Footer';
import ArticleFeed from '../../components/CustomArticle/ArticleFeed';
import { getAllArticles } from '../../actions/articlesActions';

class ArticlesPage extends Component {
  componentDidMount() {
    this.props.getAllArticles();
  }

  render() {
    const { articles } = this.props;

    return (
      <section id="home">
        <HeaderLayout/>
        <div className="row home">
          <div className="column _25">
            Articles
          </div>
          <div className="column _75">
            <div className="sidebar">
              <div className="sidebar-subscribe">
                <div className="sidebar-subscribe--title">
                  <h3>Subscribe</h3>
                </div>
                <form className="sidebar-subscribe--form">
                  <div className="sidebar-subscribe--form-fields">
                    <p>
                      <input type="email" name="EMAIL" placeholder="Your email address" required=""/>
                    </p>
                    <p>
                      <input type="submit" value="Sign up"/>
                    </p>
                  </div>
                </form>
                <p className="sidebar-subscribe--description">
                  * You will receive the latest news and updates on
                  your favorite celebrities!
                </p>
              </div>
              <div className="sidebar-subscribe">
                <div className="sidebar-subscribe--title">
                  <h3>EDITORS PICK</h3>
                </div>
                <ArticleFeed articles={articles.slice(0, 3)}/>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </section>
    );
  }
}

ArticlesPage.propTypes = {
  articles: PropTypes.array,
  getAllArticles: PropTypes.func.isRequired,
};


ArticlesPage.defautProps = {
  articles: [],
};

export const mapStateToProps = ({ articles }) => ({
  articles: articles.articles,
});

export default connect(
  mapStateToProps,
  { getAllArticles },
)(ArticlesPage);
