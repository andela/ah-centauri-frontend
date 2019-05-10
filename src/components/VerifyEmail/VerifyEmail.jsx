import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { verifyEmailAction } from '../../actions/emailVerification';
import getPayload from '../../utils/emailVerification';

function VerifyEmail(props) {
  const { pathname } = props.location;

  props.verifyEmailAction(getPayload(pathname));

  return (
    <Redirect to="/" />
  );
}

VerifyEmail.propTypes = {
  verifyEmailAction: propTypes.func.isRequired,
  location: propTypes.object.isRequired,
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { verifyEmailAction })(VerifyEmail);
