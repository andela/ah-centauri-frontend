import {Button, Grid, Image} from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';

export default function Avatar(props) {
  const {
    username, imageUrl, size, alt, editAvatar, buttonColor, buttonFloat, buttonIcon, textAlign,
  } = props;

  return (
      <Grid.Column textAlign={textAlign}>
        <Image src={imageUrl} alt={alt} size={size} avatar circular bordered/>
        <span className="avatar-username"><b>{username}</b></span>
        {editAvatar ? (
            <Button name="uploadAvatar" compact inverted color={buttonColor} floated={buttonFloat} icon={buttonIcon}/>
        ) : null}
      </Grid.Column>
  );
}

Avatar.defaultProps = {
  imageUrl: '',
  size: 'small',
  alt: 'Avatar',
  textAlign: 'center',
  editAvatar: false,
  buttonColor: 'green',
  buttonIcon: 'upload',
  buttonFloat: 'right',
};

Avatar.propTypes = {
  username: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  size: PropTypes.string,
  alt: PropTypes.string,
  textAlign: PropTypes.string,
  editAvatar: PropTypes.bool,
  buttonColor: PropTypes.string,
  buttonFloat: PropTypes.string,
  buttonIcon: PropTypes.string,
};
