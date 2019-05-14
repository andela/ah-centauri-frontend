import React from 'react';
import {
  Container,
  Header,
  List,
  Segment,
} from 'semantic-ui-react';

import GridItem from '../CustomGrid/GridItem';
import GridContainer from '../CustomGrid/GridContainer';

const Footer = () => (
  <Segment
    inverted
    vertical
    style={{
      padding: '130px 0px 130px',
    }}
  >
    <Container>
      <GridContainer
        divided
        inverted
        stackable
        columns={4}
      >

        <GridItem>
          <Header inverted as="h1" content="About" className="single_footer_part"/>
          <List link inverted>
            <Header as="h2" inverted>Vision</Header>
            <List.Item as="h2"> A Social platform for the creative at heart.</List.Item>
            <List.Item as="h3" inverted>
              Create a community of like minded authors to foster inspiration
              and innovation by leveraging the modern web.
            </List.Item>
          </List>
        </GridItem>
        <GridItem>
          <Header inverted as="h1" content="Contact Info" className="single_footer_part"/>
          <List link inverted>
            <List.Item as="h3"> Address : localhost, 127.0.0.1, root</List.Item>
            <List.Item as="h3">Phone : +1010 1010101</List.Item>
            <List.Item as="h3">Email : info@authorsheaven.com</List.Item>
          </List>
        </GridItem>
        <GridItem>
          <Header inverted as="h1" content="Services" className="single_footer_part"/>
          <List link inverted>
            <List.Item as="h3">API</List.Item>
            <List.Item as="h3">About</List.Item>

          </List>
        </GridItem>
        <GridItem>
          <Header inverted as="h1" content="Authors Heven" className="single_footer_part"/>
          <p style={{fontSize: '1.4rem'}}>
            Copyright ©
            {' '}
            {new Date().getFullYear()}
            {' '}
            All rights reserved.

          </p>
        </GridItem>
      </GridContainer>
    </Container>
  </Segment>
);

export default Footer;
