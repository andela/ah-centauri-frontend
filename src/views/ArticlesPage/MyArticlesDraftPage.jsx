import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from '../../components/layout/Footer';
import HeaderLayout from '../../components/layout/HeaderLayout';
import { filterByAuthorArticles } from '../../actions/articlesActions';
import MyArticleDraftFeed from '../../components/CustomArticle/MyArticleDraftFeed';
import requireAuth from '../../HOC/requireAuth';

export class MyArticlesDraftPage extends Component {
  componentDidMount() {
    this.props.filterByAuthorArticles(this.props.match.params.username);
  }


  render() {
    const { articles } = this.props;

    return (
      <section id="home">
        <HeaderLayout />
        <div className="row home">
          <div className="column">
            <div className="articles">
              <div className="articles-draft">
                <h1 className="articles-draft-title">Your Stories</h1>
                <Link to="/create-article" className="articles-draft-link">Write a story</Link>
              </div>
              <div className="articles-draft-separator" />
              <div className="articles-draft-tab">
                <div className="articles-draft-tab-content">
                  <div className="row articles-draft-item">
                    <MyArticleDraftFeed articles={articles} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    );
  }
}

MyArticlesDraftPage.defautProps = {
  articles: [],
  profile: {},
};

MyArticlesDraftPage.propTypes = {
  articles: PropTypes.array,
  profile: PropTypes.object,
  filterByAuthorArticles: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ articles, profile }) => ({
  articles: articles.articles,
  loading: articles.loading,
  profile: profile.current_profile,
});

export default requireAuth(connect(
  mapStateToProps,
  { filterByAuthorArticles },
)(MyArticlesDraftPage));
