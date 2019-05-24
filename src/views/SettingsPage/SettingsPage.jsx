import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Checkbox} from 'semantic-ui-react';

import {Link} from 'react-router-dom';
import {signoutAction} from '../../actions/authActions';
import {getUserNotifications, updateNotifications,} from '../../actions/notificationsActions';

import HeaderLayout from '../../components/layout/HeaderLayout';
import requireAuth from '../../HOC/requireAuth';
import Footer from '../../components/layout/Footer';


export class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailChecked: false,
      inAppChecked: false,
      errorMessage: [],
      user: {},
    };
  }

  componentDidMount() {
    this.props.getUserNotifications();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.errorMessage !== nextProps.errorMessage
      || prevState.emailChecked !== nextProps.notifications.email_notifications
      || prevState.inAppChecked !== nextProps.notifications.in_app_notifications
    ) {
      return {
        emailChecked: nextProps.notifications.email_notifications,
        inAppChecked: nextProps.notifications.in_app_notifications,
        errorMessage: nextProps.errorMessage,
        user: nextProps.notifications.user,
        loading: nextProps.loading,
      };
    }

    return {
      user: nextProps.notifications.user,
    };
  }

  handleEmailtoggle = (e) => {
    e.preventDefault();

    const data = {
      email_notifications: !this.state.emailChecked,
      in_app_notifications: this.state.inAppChecked,
    };

    this.props.updateNotifications(data);
  };

  handleInApptoggle = (e) => {
    e.preventDefault();

    const data = {
      in_app_notifications: !this.state.inAppChecked,
      email_notifications: this.state.emailChecked,
    };

    this.props.updateNotifications(data);
  };

  handleSignOut = (e) => {
    e.preventDefault();

    this.props.signoutAction();
  };

  render() {
    const { user } = this.state;
    return (
      <section id="home">
        <HeaderLayout/>
        <div className="row home">
          <div className="column _25">
            <div className="articles">
              <div className="heading">
                <div className="heading-content">
                  <h2 className="heading-title">Notifications</h2>
                </div>
              </div>
              <ul className="list">
                <li className="list-item">
                  <div className="list-item__content">
                    <h3>Your email</h3>
                    <p>
                      {user ? user.email : '...'}
                      {' '}
                    </p>
                    <span>Ensure a valid email address is provided to receive notifications.</span>
                  </div>
                  <Link to="/profile">Edit details</Link>
                </li>
                <li className="list-item">
                  <div className="list-item__content">
                    <h3>
                      Filter Notifications
                    </h3>
                    <p>
                      Select the account activities for which to receive notifications.
                    </p>
                  </div>
                  <Checkbox
                    toggle
                    label="Email Notifications"
                    onChange={this.handleEmailtoggle}
                    checked={this.state.emailChecked}
                  />
                  <Checkbox
                    toggle
                    label="In App Notifications"
                    onChange={this.handleInApptoggle}
                    checked={this.state.inAppChecked}
                  />
                </li>
              </ul>
              <div className="heading">
                <div className="heading-content">
                  <h2 className="heading-title">Security</h2>
                </div>
              </div>
              <ul className="list">
                <li className="list-item">
                  <div className="list-item__content">
                    <h3>Sign out of all other sessions</h3>
                    <p>
                      This will sign you out of sessions in other
                      browsers or on other computers.
                    </p>
                  </div>
                  <button style={{ background: 'red', color: 'white' }} onClick={this.handleSignOut}>
                    Sign out other
                    sessions
                  </button>
                </li>
                <li className="list-item">
                  <div className="list-item__content">
                    <h3>Delete account</h3>
                    <p>
                      Permanently delete your account and all of your content.
                    </p>
                  </div>
                  <button style={{ background: 'red', color: 'white' }}>Coming Soon.</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Footer/>
      </section>
    );
  }
}

SettingsPage.defaultProps = {
  notifications: {},
};

SettingsPage.propTypes = {
  notifications: PropTypes.object,
  signoutAction: PropTypes.func.isRequired,
  getUserNotifications: PropTypes.func.isRequired,
  updateNotifications: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ notifications, articles }) => ({
  errorMessage: articles.errorMessage,
  loading: notifications.loading,
  notifications: notifications.notifications,
});

export default requireAuth(connect(mapStateToProps, {
  signoutAction,
  getUserNotifications,
  updateNotifications,
})(SettingsPage));
