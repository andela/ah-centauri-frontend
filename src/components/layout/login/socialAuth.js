import React from 'react';
import PropTypes from 'prop-types';

import {Button, Icon} from 'semantic-ui-react';

const socialButtons = (props) => {
  const { facebookLogin, googleLogin, twitterLogin } = props;
  return (
    <div>
      <Button color="facebook " onClick={facebookLogin}>
        <Icon name="facebook" />
      </Button>
      <Button color="twitter" onClick={twitterLogin}>
        <Icon name="twitter" />
      </Button>
      <Button color="google plus" onClick={googleLogin}>
        <Icon name="google" />
      </Button>
    </div>
  );
};

socialButtons.propTypes = {
  facebookLogin: PropTypes.func.isRequired,
  twitterLogin: PropTypes.func.isRequired,
  googleLogin: PropTypes.func.isRequired,
};

export default socialButtons;
