import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';

function GridContainer({ ...props }) {
  const {
    children, columns, ...rest
  } = props;
  return (
    <Grid {...rest}>
      <Grid.Row columns={columns}>
        { children }
      </Grid.Row>
    </Grid>
  );
}

GridContainer.defaultProps = {
  className: '',
  columns: 1,
};

GridContainer.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: PropTypes.node,
  className: PropTypes.string,
  columns: PropTypes.number,
};

export default GridContainer;
