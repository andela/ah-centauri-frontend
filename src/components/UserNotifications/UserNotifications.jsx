import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { List, Image } from 'semantic-ui-react';
import Pusher from 'react-pusher';
import jwtDecode from 'jwt-decode';
import 'intersection-observer';
import {
  updateNotificationList,
  notificationsMarkAsRead,
  getFreshNotificationList,
} from '../../actions/notificationsActions';

class UserNotifications extends Component {
    state = {
      showNotification: false,
      prevY: 0,
      firstPage: 1,
    };

    componentDidMount() {
      this.props.updateNotificationList(this.state.firstPage);

      const options = {
        root: document.querySelector('.notification-list'),
        rootMargin: '0px',
        threshold: 0.0,
      };

      this.observer = new IntersectionObserver(this.handleObserver, options);
      this.observer.observe(this.loadingRef);

      document.addEventListener('click', this.handleClickOutsideComponent, false);
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.handleClickOutsideComponent, false);
    }

    handleObserver = (entities, observer) => {
      const { y } = entities[0].boundingClientRect;
      const { nextPage } = this.props.notifications;


      if ((this.state.prevY > y) && (y >= 400) && nextPage) {
        this.props.updateNotificationList(nextPage.slice(-1));
      }

      this.setState({ prevY: y });
    };

    handleClick = (e) => {
      this.props.notificationsMarkAsRead();
      const { showNotification } = this.state;
      this.setState({ showNotification: !showNotification });
    };

    handleClickOutsideComponent = (e) => {
      if (!this.node.contains(e.target)) {
        this.setState({ showNotification: false });
      }
    };

    getResourceRoute = (type, identifier) => {
      switch (type) {
        case 'article_published':
        case 'article_rated':
        case 'article_comment':
          return `/article/${identifier}`;
        case 'user_followed':
          return `/profile/${identifier}`;
        default:
          return '#';
      }
    }

    render() {
      const { showNotification } = this.state;
      const { authenticated } = this.props;
      const { notifications, unreadNotifications } = this.props.notifications;

      let decodedToken = null;

      if (authenticated) {
        const token = localStorage.getItem('AUTH_TOKEN');
        decodedToken = jwtDecode(token);
      }

      return (
        <>
          <Pusher
            channel={decodedToken ? `user-${decodedToken.id}` : 'public'}
            event="notificationReceived"
            onUpdate={() => this.props.getFreshNotificationList(this.state.firstPage)}
          />
          <span className="menu-item-has-children" ref={(node) => { this.node = node; }}>
            <Link
              to="#"
              className={classNames({ notification: true, 'show-count': unreadNotifications })}
              data-count={unreadNotifications}
              onClick={this.handleClick}
            />
            <List
              selection
              verticalAlign="middle"
              className={classNames({ 'notification-list': true, 'show-notfications': showNotification })}
            >
              {notifications.map(n => (
                <List.Item>
                  <Image avatar src="https://react.semantic-ui.com/images/avatar/small/rachel.png" />
                  <List.Content>
                    <List.Header>{n.source.username}</List.Header>
                    <List.Description>
                      {n.short_description}
                        &nbsp;
                      <a href={this.getResourceRoute(n.action, n.url)}>{n.source_display_name}</a>
                      &nbsp;
                      {moment(n.create_date).fromNow()}
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))}
              <div ref={(loadingRef) => { this.loadingRef = loadingRef; }}> </div>
            </List>
          </span>
        </>
      );
    }
}

UserNotifications.defaultProps = {
  authenticated: false,
};

export const mapStateToProps = ({ auth, notifications }) => ({
  notifications,
  authenticated: auth.authenticated,
});

export default connect(mapStateToProps, {
  updateNotificationList,
  notificationsMarkAsRead,
  getFreshNotificationList,
})(UserNotifications);
