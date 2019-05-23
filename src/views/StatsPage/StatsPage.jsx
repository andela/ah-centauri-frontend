import React, { Component } from 'react';
import {
  Header,
  Table,
  Segment,
  Dimmer,
  Loader,
  Image,
  Icon,
} from 'semantic-ui-react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderLayout from '../../components/layout/HeaderLayout';
import Footer from '../../components/layout/Footer';
import requireAuth from '../../HOC/requireAuth';
import {
  getMyArticleViewsStats,
  getMyViewedArticleStats,
} from '../../actions/analyticsActions';


export class StatsPage extends Component {
  componentDidMount() {
    this.props.getMyArticleViewsStats();
    this.props.getMyViewedArticleStats();
  }

  render() {
    const {
      myArticleViews,
      myArticleViewsCount,
      views,
      errorMessage,
      viewsCount,
      loading,
    } = this.props;

    let total = 0;
    let fullRead = 0;

    const renderViews = _.map(myArticleViews, (view) => {
      total += view.article.totalViews;
      fullRead += view.full_read ? 1 : 0;
      return (
        <Table.Row key={view.id}>
          <Table.Cell>
            <Header as="h2" textAlign="center">
              {view.user}
            </Header>
          </Table.Cell>
          <Table.Cell singleLine>
            {view.article.title}
          </Table.Cell>
          <Table.Cell singleLine>
            {view.article.author}
          </Table.Cell>
          <Table.Cell>
            {JSON.stringify(view.full_read)}
          </Table.Cell>
          <Table.Cell textAlign="right">
            {view.article.totalViews}
          </Table.Cell>
          <Table.Cell>
            {view.article.description}
          </Table.Cell>
        </Table.Row>
      );
    });
    return (
      <section id="home">
        <HeaderLayout/>
        <div className="row home">
          <div className="column">
            <div className="stats">
              <h1 className="stats-title stats-title--page">Your stats</h1>
              <span>
                Traffic and visitor statistics are
                available for stories you publish on Medium.
              </span>


              <div className="stats-header">
                <p className="item">
                  <h2>{total}</h2>
                  <span>Views</span>
                </p>
                <p className="item">
                  <h2>{fullRead}</h2>
                  <span>Full Reads</span>
                </p>
                <p className="item">
                  <h2>{myArticleViewsCount}</h2>
                  <span>No. of Articles</span>
                </p>
              </div>

              <div className="stats-content">
                <h2>Stories</h2>
                <div className="stats-content__item">
                  {_.isEmpty(myArticleViews)
                    ? (
                      <Segment placeholder>
                        <Header icon>
                          <Icon name='file alternate outline'/>
                          There are no published stories for which you can view stats.
                        </Header>
                      </Segment>
                    )
                    : (
                      <div>
                        {' '}
                        {loading ? (
                            <Segment>
                              <Dimmer active>
                                <Loader indeterminate>Preparing Files</Loader>
                              </Dimmer>

                              <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png"/>
                            </Segment>
                          )
                          : (
                            <Table celled padded>
                              <Table.Header>
                                <Table.Row>
                                  <Table.HeaderCell singleLine>user</Table.HeaderCell>
                                  <Table.HeaderCell>Article Title</Table.HeaderCell>
                                  <Table.HeaderCell>Article Author</Table.HeaderCell>
                                  <Table.HeaderCell>Full Read</Table.HeaderCell>
                                  <Table.HeaderCell>Total Views</Table.HeaderCell>
                                  <Table.HeaderCell>Description</Table.HeaderCell>
                                </Table.Row>
                              </Table.Header>
                              <Table.Body>
                                {renderViews}
                              </Table.Body>
                            </Table>
                          )
                        }
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </section>
    );
  }
}


StatsPage.defaultProps = {
  myArticleViews: [],
  myArticleViewsCount: 0,
  views: [],
  viewsCount: 0,
  errorMessage: {},
  loading: false,
};

StatsPage.propTypes = {
  myArticleViews: PropTypes.array,
  myArticleViewsCount: PropTypes.number,
  views: PropTypes.array,
  errorMessage: PropTypes.object,
  viewsCount: PropTypes.number,
  loading: PropTypes.bool,
  getMyArticleViewsStats: PropTypes.func.isRequired,
  getMyViewedArticleStats: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ analytics }) => ({
  myArticleViews: analytics.myArticleViews,
  myArticleViewsCount: analytics.myArticleViewsCount,
  views: analytics.views,
  viewsCount: analytics.viewsCount,
  errorMessage: analytics.errorMessage,
  loading: analytics.loading,
});

export default requireAuth(connect(mapStateToProps, {
  getMyArticleViewsStats,
  getMyViewedArticleStats,
})(StatsPage));
