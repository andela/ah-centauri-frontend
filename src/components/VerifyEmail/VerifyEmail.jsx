import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { verifyEmailAction } from '../../actions/emailVerification';
import getPayload from '../../utils/emailVerification';

export function VerifyEmail(props) {
  const { pathname } = props.location;
  const { verifyEmailAction, history } = props;

  verifyEmailAction(getPayload(pathname));
  history.push('/');

  return null;
}

VerifyEmail.propTypes = {
  verifyEmailAction: propTypes.func.isRequired,
  location: propTypes.object.isRequired,
};

const mapStateToProps = state => ({ ...state });

export default connect(mapStateToProps, { verifyEmailAction })(VerifyEmail);
