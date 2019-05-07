import React from 'react';
import { Button, Icon } from 'semantic-ui-react'

const socialall = (props) => {
  const {facebookLogin, googleLogin, twitterLogin} = props;
  return (
    <div>
    <Button color='facebook' onClick={facebookLogin}>
      <Icon name='facebook' />
    </Button>
    <Button color='twitter' onClick={twitterLogin}>
      <Icon name='twitter' />
    </Button>
    <Button color='google plus' onClick={googleLogin}>
      <Icon name='google' /> 
    </Button>
    </div>
  );
};

export default socialall;
