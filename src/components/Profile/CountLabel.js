import {Icon, Label} from 'semantic-ui-react';
import React from 'react';
import PropTypes from 'prop-types';

export default function CountLabel(props) {
  const {
    iconName, labelCount, labelName, color,
  } = props;

  return (
      <Label className="count-label" color={color}>
        <Icon name={iconName}/>
        {labelName}
        <Label.Detail>{labelCount}</Label.Detail>
      </Label>
  );
}

CountLabel.defaultProps = {
  labelName: 'Total',
  color: 'black',
  iconName: 'users',
};

CountLabel.propTypes = {
  labelCount: PropTypes.number.isRequired,
  labelName: PropTypes.string,
  color: PropTypes.string,
  iconName: PropTypes.string,
};
