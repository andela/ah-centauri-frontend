import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderLayout from '../../components/layout/HeaderLayout';
import Footer from '../../components/layout/Footer';
import {
  getAllArticles,
  getSingleArticles,
} from '../../actions/articlesActions';
import SideBar from '../../components/layout/SideBar';
import SingleArticleItem from '../../components/CustomArticle/SingleArticleItem';

class ArticlesDescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      articles: [],
    };
  }

  componentDidMount() {
    const { slug } = this.props.match.params;
    this.props.getAllArticles();
    this.props.getSingleArticles(slug);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.article !== prevState.article
    || nextProps.articles !== prevState.articles) {
      return {
        article: nextProps.article,
        articles: nextProps.articles,
      };
    }
    return null;
  }

  render() {
    const { articles, article } = this.state;

    return (
      <section id="home">
        <HeaderLayout />
        <div className="row home">
          <div className="column _25">
            <SingleArticleItem article={article} key={article.id} />
          </div>
          <div className="column _75">
            <SideBar articles={articles} />
          </div>
        </div>
        <Footer />
      </section>
    );
  }
}

ArticlesDescription.defautProps = {
  articles: [],
  article: {},
};

ArticlesDescription.propTypes = {
  articles: PropTypes.array,
  article: PropTypes.object,
  getAllArticles: PropTypes.func.isRequired,
  getSingleArticles: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ articles }) => ({
  articles: articles.articles,
  article: articles.article,
  loading: articles.loading,
});

export default connect(
  mapStateToProps,
  { getAllArticles, getSingleArticles },
)(ArticlesDescription);
