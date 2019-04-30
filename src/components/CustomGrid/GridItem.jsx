import React from 'react';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';


function GridItem({ ...props }) {
  const { children, className, ...rest } = props;
  return (
    <Grid.Column {...rest} className={className}>
      { children }
    </Grid.Column>
  );
}

GridItem.defaultProps = {
  className: '',
  columns: 1,
};

GridItem.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  className: PropTypes.string,
  columns: PropTypes.number,
};

export default GridItem;
