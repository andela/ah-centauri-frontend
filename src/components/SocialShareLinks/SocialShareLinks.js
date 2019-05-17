import React from 'react';
import {Button} from 'semantic-ui-react';
import PropTypes from 'prop-types';

const CircularSocial = (props) => {
  const { shareLinks, size } = props;
  return (
    <div>
      <Button target="_blank" href={shareLinks.facebook} circular size={size} color="facebook" icon="facebook" />
      <Button target="_blank" href={shareLinks.twitter} circular size={size} color="twitter" icon="twitter" />
      <Button target="_blank" href={shareLinks.email} circular size={size} icon="mail" />
    </div>
  );
};

CircularSocial.defaultProps = {
  size: 'medium',
};

CircularSocial.propTypes = {
  shareLinks: PropTypes.object.isRequired,
  size: PropTypes.string,
};

export default CircularSocial;
