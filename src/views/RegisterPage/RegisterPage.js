import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Message,} from 'semantic-ui-react';
import CustomForm from '../../components/CustomForm/CustomForm';
import isEmpty from '../../utils/is_empty';
import SocialButtons from '../../components/layout/login/socialAuth';


export class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
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

    this.props.signUpAction({ user: this.state });
  };

  render() {
    const {
      username, email, password, errorMessage,
    } = this.state;
    const {
      loading, successMessage, authenticated,
    } = this.props;

    return (
      <div>

        {successMessage
          ? (
            <Message
              success
              header="Your user registration was successful"
              content={successMessage}
            />
          ) : ''}

        <CustomForm
          className="register-form"
          loading={loading}
          size="large"
          errorMessage={errorMessage}
          handleSubmit={this.handleSubmit}
          buttonName="register"
          inputFields={[
            {
              fluid: true,
              name: 'username',
              id: 'username',
              placeholder: 'username',
              type: 'text',
              value: username,
              onChange: this.handleInputChange,
              error: !isEmpty(errorMessage ? errorMessage.username : ''),
            },
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
      </div>
    );
  }
}

RegisterPage.defautProps = {
  loading: false,
};

RegisterPage.propTypes = {
  // eslint-disable-next-line max-len
  // eslint-disable-next-line
  // react/forbid-prop-types,react/require-default-props,react/no-unused-prop-types
  errorMessage: PropTypes.object,
  // eslint-disable-next-line react/require-default-props
  successMessage: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  loading: PropTypes.bool,
  signUpAction: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ auth }) => ({
  errorMessage: auth.errorMessage,
  loading: auth.loading,
  successMessage: auth.successMessage,
  authenticated: auth.authenticated,
});

export default connect(
  mapStateToProps,
)(RegisterPage);
