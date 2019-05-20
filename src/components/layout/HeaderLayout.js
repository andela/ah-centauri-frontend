import React, {Component} from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Header} from 'semantic-ui-react';
import {Login} from '../../views/Login/Login';
import {RegisterPage} from '../../views/RegisterPage/RegisterPage';
import {loginAction, signoutAction, signUpAction,} from '../../actions/authActions';
import {getMyProfileAction} from '../../actions/profileActions';
import {SemanticToastContainer} from 'react-semantic-toasts';


export class HeaderLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      opened: false,
      username: '',
      first_name: '',
      last_name: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.username !== nextProps.profile.username
        || prevState.first_name !== nextProps.profile.first_name
        || prevState.opened !== nextProps.opened
        || prevState.last_name !== nextProps.profile.last_name) {
      return {
        username: nextProps.profile.username,
        first_name: nextProps.profile.first_name,
        last_name: nextProps.profile.last_name,
      };
    }

    return null;
  }

  componentDidMount() {
    // Set the token for use in accessing the protected get Profile endpoint
    this.props.getMyProfileAction();
  }

  handleSignOut = (e) => {
    this.props.signoutAction();
  };

  handleToggle = () => {
    this.setState(prevState => ({
      toggle: !prevState.toggle,
    }));
  };

  handleModal = () => {
    this.setState(prevState => ({
      opened: !prevState.opened,
    }));
  };

  render() {
    const { toggle, opened, username } = this.state;
    const { authenticated, loading, errorMessage } = this.props;


    return (
      <div id="header-menu" className="sticky">
        <header>
          <Link to="/" className="logo">AH</Link>
          <div
            className={classNames({ 'menu-toggle': true, active: toggle })}
            onClick={this.handleToggle}
          />
          <nav className={classNames({ active: toggle })}>
            <ul>
              <li><Link to="/" className="active">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/team">Team</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              {authenticated ? (
                <li className="menu-item-has-children">
                  <a href="#">
                    <img
                      src="https://img.icons8.com/bubbles/2x/user.png"
                      alt="logo"
                      style={{
                        width: '5rem',
                        height: '5rem',
                        marginTop: ' -1.5rem',
                        marginBottom: '-2rem',
                      }}
                    />
                    {username}
                  </a>
                  <ul className="sub-menu">
                    <li><Link to="/create-article">New Story</Link></li>
                    <li><Link to={`/me/stories/drafts/${username}`}>Stories</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><a onClick={this.handleSignOut} href="#">Signout</a></li>
                  </ul>
                </li>
              ) : (
                <li><button onClick={this.handleModal}>Login</button></li>
              )}

            </ul>
          </nav>
          <div className="clearfix" />
        </header>

        {/* Authentication */}
        <div className={classNames({ 'modal-overlay': (!authenticated && opened) })} id="modal-overlay" />
        <div className={classNames({ modal: true, opened: (!authenticated && opened) })} id="modal">
          <button className="close-button" id="close-button" onClick={this.handleModal}>X</button>
          <div className="modal-tabs">
            <input className="state" type="radio" title="tab-one" name="tabs-state" id="tab-one" defaultChecked />
            <input className="state" type="radio" title="tab-two" name="tabs-state" id="tab-two" />

            <div className="tabs flex-tabs">
              <label htmlFor="tab-one" id="tab-one-label" className="tab">Login</label>
              <label htmlFor="tab-two" id="tab-two-label" className="tab">Register</label>


              <div id="tab-one-panel" className="panel active">
                <Header
                  as="h1"
                  textAlign="center"
                >
                    Login
                </Header>
                <Login loading={loading} errorMessage={errorMessage} loginAction={this.props.loginAction} />
              </div>
              <div id="tab-two-panel" className="panel">
                <Header
                  as="h1"
                  textAlign="center"
                >
                    Register
                </Header>
                <RegisterPage loading={loading} errorMessage={errorMessage} signUpAction={this.props.signUpAction} />
              </div>
            </div>
          </div>
        </div>
        <div className="header-toast">
          <SemanticToastContainer />
        </div>
      </div>
    );
  }
}

HeaderLayout.defaultProps = {
  authenticated: false,
  profile: {
    username: '',
    first_name: '',
    last_name: '',
  },
};

HeaderLayout.propTypes = {
  authenticated: PropTypes.bool,
  profile: PropTypes.shape({
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
  getMyProfileAction: PropTypes.func.isRequired,
  loginAction: PropTypes.func.isRequired,
  signUpAction: PropTypes.func.isRequired,
  errorMessage: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

export const mapStateToProps = ({ auth, profile }) => ({
  authenticated: auth.authenticated,
  errorMessage: auth.errorMessage,
  loading: auth.loading,
  profile: profile.current_profile,
});

export default connect(mapStateToProps, {
  loginAction, signUpAction, getMyProfileAction, signoutAction,
})(HeaderLayout);
