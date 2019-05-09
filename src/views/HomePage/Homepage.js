import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { socialAuthentication } from '../../firebase';

class HomePage extends Component {
  render() {
    return (
      <div id='home'>
        home page
        <Button onClick={() => socialAuthentication.signOut()}>Sign out</Button>
      </div>
    );
  }
}

export default HomePage;
