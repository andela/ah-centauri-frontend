import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ArticleFeed from '../../components/CustomArticle/ArticleFeed';
import Header from '../../components/layout/HeaderLayout';
import Footer from '../../components/layout/Footer';

import { getAllArticles } from '../../actions/articlesActions';
<<<<<<< HEAD
=======
import SideBar from '../../components/layout/SideBar';
>>>>>>> aeb4fd03728d7c29fb5c2178872a609cc401f340

class HomePage extends Component {
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
<<<<<<< HEAD
            <div className="sidebar">
              <div className="sidebar-subscribe">
                <div className="sidebar-subscribe--title">
                  <h3>Subscribe</h3>
                </div>
                <form className="sidebar-subscribe--form">
                  <div className="sidebar-subscribe--form-fields">
                    <p>
                      <input type="email" name="EMAIL" placeholder="Your email address" required="" />
                    </p>
                    <p>
                      <input type="submit" value="Sign up" />
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
=======
            <SideBar articles={articles}/>
>>>>>>> aeb4fd03728d7c29fb5c2178872a609cc401f340
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
