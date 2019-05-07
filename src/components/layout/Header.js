import React, { Component } from 'react';
import {
  Button,
  Input,
  Menu,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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

  render() {
    const { activeItem } = this.state;
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
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..."/>
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
      </Menu>
    );
  }
}

export default Header;
