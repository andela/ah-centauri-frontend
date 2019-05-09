import React, { Component } from 'react';
import {
  Container,
  Header,
} from 'semantic-ui-react';

class CreateArticlesPage extends Component {
  render() {
    return (
      <section className="new-article">
        <Container className="new-article__container">
          <h2 className="ui header">
            <i aria-hidden="true" className="settings icon" />
            <div className="content">
              Account Settings
              <div className="sub header">Manage your preferences</div>
            </div>
          </h2>
        </Container>
      </section>
    );
  }
}

export default CreateArticlesPage;
