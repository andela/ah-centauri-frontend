import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Image, Menu } from 'semantic-ui-react';
import logo from '../../images/logo.png'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
    };

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Menu pointing secondary>
        <Menu.Item
          as={Link}
          to="/"
          name="home"
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        >
          <Image
            size="mini"
            bordered
            centered
            circular
            src={logo}
          />
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/"
          name="home"
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="auth"
            active={activeItem === 'auth'}
            onClick={this.handleItemClick}
          >
            <Button.Group>
              <Link to="/login">
                <Button>Signin</Button>
              </Link>

              <Button.Or/>
              <Link to="/register">
                <Button positive>Signup</Button>
              </Link>
            </Button.Group>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default Header;