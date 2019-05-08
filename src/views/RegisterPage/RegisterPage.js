import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Header,
  Icon,
  Message,
} from 'semantic-ui-react';

import './RegisterPage.scss';
import { signUpAction } from '../../actions/authActions';
import CustomForm from '../../components/CustomForm/CustomForm';
import isEmpty from '../../utils/is_empty';
import GridContainer from '../../components/CustomGrid/GridContainer';
import GridItem from '../../components/CustomGrid/GridItem';


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
      loading, successMessage,
    } = this.props;

    return (
      <div className="signup-form">
        <GridContainer
          textAlign="center"
          className="register"
          style={{ height: '100%' }}
          verticalAlign="middle"
          divided="vertically"
          columns={2}
        >

          <GridItem>
            <Header
              as="h2"
              textAlign="center"
            >
              Sign Up.
            </Header>
            <Header
              as="h4"
              textAlign="center"
            >
              Enter the email address associated with your account,
              and we’ll send a magic link to your inbox.
            </Header>
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
            <Message warning>
              <Icon name="help" />
              Already have an account?&nbsp;
              <a href="/login">login</a>
              &nbsp;instead.
            </Message>
          </GridItem>
        </GridContainer>
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
});

export default connect(
  mapStateToProps,
  { signUpAction },
)(RegisterPage);
