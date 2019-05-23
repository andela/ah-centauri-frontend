import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { resetPasswordService } from '../../actions/resetActions';
import ResetPasswordForm from '../../components/resetPassword/resetPasswordForm';
import Header from '../../components/layout/HeaderLayout';
import Footer from '../../components/layout/Footer';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      new_password: '',
      confirm_password: '',
      token: '',
      errorMessage: '',
      successMessage: {},
      formState: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.errorMessage !== nextProps.errorMessage
      || prevState.successMessage !== nextProps.successMessage
      || prevState.formState !== nextProps.formState) {
      return {
        errorMessage: nextProps.errorMessage,
        successMessage: nextProps.successMessage,
        formState: nextProps.formState,
      };
    }
    return null;
  }

  async componentDidMount() {
    this.setState({ token: this.props.match.params.token });
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const resetData = {
      password_data: {
        new_password: this.state.new_password,
        confirm_password: this.state.confirm_password,
      },
    };
    const data = {
      resetData,
      token: this.state.token,
    };
    this.props.resetPasswordService({ data });
  };

  render() {
    const {
      new_password, confirm_password, errorMessage, successMessage, formState,
    } = this.state;
    return (
      <div>
        <Header/>
        <ResetPasswordForm
          errorMessage={errorMessage}
          successMessage={successMessage}
          formState={formState}
          handleSubmit={this.handleSubmit}
          inputFields={[
            {
              label: 'New password',
              placeholder: 'password',
              name: 'new_password',
              type: 'password',
              value: new_password,
              onChange: this.handleChange,
            },
            {
              label: 'Confirm password',
              placeholder: 'password',
              name: 'confirm_password',
              type: 'password',
              value: confirm_password,
              onChange: this.handleChange,
            },
          ]}
        />
        <Footer/>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  errorMessage: PropTypes.string,
  successMessage: PropTypes.object,
  formState: PropTypes.string,
  resetPasswordService: PropTypes.func.isRequired,
};

export const mapStateToProps = state => ({
  errorMessage: state.resetReducer.errorMessage,
  successMessage: state.resetReducer.successMessage,
  formState: state.resetReducer.formState,
});

export default connect(
  mapStateToProps,
  { resetPasswordService },
)(ResetPassword);
export const _ResetPassword = ResetPassword;
