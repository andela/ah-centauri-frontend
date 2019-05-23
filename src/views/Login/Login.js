import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Message,} from 'semantic-ui-react';

import {loginAction} from '../../actions/authActions';
import CustomForm from '../../components/CustomForm/CustomForm';
import isEmpty from '../../utils/is_empty';
import SocialButtons from '../../components/layout/login/socialAuth';


export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: {},
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    if (prevState.errorMessage !== nextProps.errorMessage

      || prevState.loading !== nextProps.loading) {
      return {
        errorMessage: nextProps.errorMessage,
      };
    }

    return null;
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.loginAction({ user: this.state });
  };

  render() {
    const {
      email,
      password,
      errorMessage,
    } = this.state;

    const { loading, authenticated } = this.props;
    return authenticated ? <Redirect to="/" /> : (
      <div>
        <CustomForm
          className="register-form"
          loading={loading}
          size="large"
          errorMessage={errorMessage}
          handleSubmit={this.handleSubmit}
          buttonName="login"
          inputFields={[
            {
              fluid: true,
              name: 'email',
              placeholder: 'E-mail address',
              type: 'email',
              value: email,
              onChange: this.handleInputChange,
              error: !isEmpty(errorMessage ? errorMessage.email : ''),
            },
            {
              fluid: true,
              name: 'password',
              placeholder: 'Password',
              type: 'password',
              value: password,
              onChange: this.handleInputChange,
              error: !isEmpty(errorMessage ? errorMessage.password : ''),
            },
          ]}
        />
        <Message>
          Or sign up using your social media account
          <SocialButtons {...this.props} />
        </Message>
        <Message warning>
          <a href="/reset" style={{ display: 'flex', justifyContent: 'center' }}> Forgot your password? </a>
        </Message>
      </div>

    );
  }
}

Login.defautProps = {
  loading: false,
};

Login.propTypes = {
  // eslint-disable-next-line max-len
  // eslint-disable-next-line
  // react/forbid-prop-types,react/require-default-props,react/no-unused-prop-types
  errorMessage: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  authenticated: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  loading: PropTypes.bool,
  loginAction: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ auth }) => ({
  errorMessage: auth.errorMessage,
  loading: auth.loading,
  authenticated: auth.authenticated,
});

export default connect(mapStateToProps, { loginAction })(Login);
