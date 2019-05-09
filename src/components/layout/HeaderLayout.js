import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Header, } from 'semantic-ui-react';
import { Login } from '../../views/Login/Login';
import { RegisterPage } from '../../views/RegisterPage/RegisterPage';
import {
  loginAction,
  signUpAction,
} from '../../actions/authActions';


class HeaderLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      opened: false,
    };
  }


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
    const { toggle, opened } = this.state;
    const { authenticated } = this.props;


    return (
      <div>
        <header>
          <Link to="#" className="logo">AH</Link>
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
              <li><button onClick={this.handleModal}>Login</button></li>
            </ul>
          </nav>
          <div className="clearfix" />
        </header>

        {/* Authentication */}
        <div className={classNames({ 'modal-overlay': opened })} id="modal-overlay" />
        <div className={classNames({ modal: true, opened })} id="modal">
          <button className="close-button" id="close-button" onClick={this.handleModal}>X</button>
          <div className="modal-tabs">
            <input className="state" type="radio" title="tab-one" name="tabs-state" id="tab-one" checked />
            <input className="state" type="radio" title="tab-two" name="tabs-state" id="tab-two" />

            <div className="tabs flex-tabs">
              <label htmlFor="tab-one" id="tab-one-label" className="tab">Login</label>
              <label htmlFor="tab-two" id="tab-two-label" className="tab">Register</label>


              <div id="tab-one-panel" className="panel active">
                <h3>Responsive CSS Tabs - Flexbox</h3>
                <Login loginAction={loginAction} />
              </div>
              <div id="tab-two-panel" className="panel">
                <RegisterPage signUpAction={signUpAction} />
              </div>
            </div>

          </div>
        </div>
        <div className={classNames({ 'modal-overlay': opened })} id="modal-overlay"/>
        <div className={classNames({ modal: true, opened })} id="modal">
          <button className="close-button" id="close-button" onClick={this.handleModal}>X</button>
          <div className="modal-tabs">
            <input className="state" type="radio" title="tab-one" name="tabs-state" id="tab-one" checked/>
            <input className="state" type="radio" title="tab-two" name="tabs-state" id="tab-two"/>

            <div className="tabs flex-tabs">
              <label htmlFor="tab-one" id="tab-one-label" className="tab">Login</label>
              <label htmlFor="tab-two" id="tab-two-label" className="tab">Register</label>


              <div id="tab-one-panel" className="panel active">
                <h3>Responsive CSS Tabs - Flexbox</h3>
                <Login loginAction={loginAction}/>
              </div>
              <div id="tab-two-panel" className="panel">
                <RegisterPage signUpAction={signUpAction}/>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

Header.defaultProps = {
  authenticated: false,
};

Header.propTypes = {
  authenticated: PropTypes.bool,
};

const mapStateToProps = ({ auth }) => ({ authenticated: auth.authenticated });

export default connect(mapStateToProps)(HeaderLayout);
