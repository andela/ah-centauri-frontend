import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  Input,
  Menu,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { socialSignOut } from '../../actions/socialAuthActions';


export class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
    };
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  handleSignout = () => {
    this.props.socialSignOut();
  }

  render() {
    const { activeItem } = this.state;
    // eslint-disable-next-line react/prop-types
    const { authenticated } = this.props;

    return (
      <Menu pointing secondary className="header-menu">
        <Menu.Item
          as={Link}
          to="/"
          name="home"
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />

        <Menu.Item
          as={Link}
          to="/features"
          name="features"
          active={activeItem === 'features'}
          onClick={this.handleItemClick}
        >
          Features
        </Menu.Item>

        <Menu.Item
          as={Link}
          to="/testimonials"
          name="testimonials"
          active={activeItem === 'testimonials'}
          onClick={this.handleItemClick}
        >
          Testimonials
        </Menu.Item>
        {
          !authenticated
            ? (
              <Menu.Menu position="right">
                <Menu.Item>
                  <Input icon="search" placeholder="Search..." />
                </Menu.Item>
                <Menu.Item
                  as={Link}
                  to="/register"
                  name="sign-in"
                  active={activeItem === 'sign-in'}
                  onClick={this.handleItemClick}
                >
                  <Button primary>Sign in / Sign-up</Button>
                </Menu.Item>
              </Menu.Menu>
            ) : (
                <Menu.Menu position="right">
                  <Menu.Item>
                    <Input icon="search" placeholder="Search..." />
                  </Menu.Item>
                  <Menu.Item
                    as={Link}
                    to="/"
                    name="sign-out"
                    active={activeItem === 'sign-out'}
                    onClick={this.handleItemClick}
                  >
                    <Button onClick={this.handleSignout}>Sign out</Button>
                  </Menu.Item>
                </Menu.Menu>
            )
        }
      </Menu>
    );
  }
}

Header.propTypes = {
  socialSignOut: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({ authenticated: auth.authenticated });

export default connect(mapStateToProps, { socialSignOut })(Header);
