import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import {
  Header,
  Icon,
  Placeholder,
  Segment,
} from 'semantic-ui-react';
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
    const { articles, loading } = this.props;

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

                {loading

                  ? (
                    <div className="articles-draft-tab-content">
                      <div className="row articles-draft-item">
                        {_.map([1, 1, 2, 3, 4, 5, 6, 7], a => (
                          <div style={{ width: '30%', margin: '1rem 1rem' }}>
                            <Segment raised>
                              <Placeholder>
                                <Placeholder.Header image>
                                  <Placeholder.Line/>
                                  <Placeholder.Line/>
                                </Placeholder.Header>
                                <Placeholder.Paragraph>
                                  <Placeholder.Line length="medium"/>
                                  <Placeholder.Line length="short"/>
                                </Placeholder.Paragraph>
                              </Placeholder>
                            </Segment>
                          </div>
                        ))}

                      </div>
                    </div>
                  )
                  : _.isEmpty(articles)
                    ? (
                      <Segment placeholder>
                        <Header icon>
                          <Icon name="file alternate outline"/>
                          There are no published stories for which you can view.
                        </Header>
                      </Segment>
                    )
                    : (
                      <div className="articles-draft-tab-content">
                        <div className="row articles-draft-item">
                          <MyArticleDraftFeed
                            articles={articles}
                            loading={loading}
                          />
                        </div>
                      </div>
                    )
                }
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
  loading: false,
};

MyArticlesDraftPage.propTypes = {
  articles: PropTypes.array,
  profile: PropTypes.object,
  loading: PropTypes.object,
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
