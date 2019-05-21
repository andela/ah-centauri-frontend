import React from 'react';
import {Button, List, Popup} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import moment from 'moment';
import {connect} from 'react-redux';
import {removeBookmark} from '../../actions/bookmarksActions';

export class BookmarkItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleRemoveBookmark.bind(this);
  }

  handleRemoveBookmark = (e, id) => {
    e.preventDefault();
    this.props.removeBookmark(id);
  };

  render() {
    const { bookmark, username } = this.props;
    return (
      <List.Item>
        <List.Content>
          <List.Header to={`/article/${bookmark.article.slug}`} as={Link}>
            {bookmark.article.title}
          </List.Header>
          <br />
          <List.Description>
              Written by
            {' '}
            {(bookmark.article.author === username) ? <i>you</i> : (<a href={`/profile/${bookmark.article.author}`}>{bookmark.article.author}</a>) }
              ,
            {' '}
            <i className="bookmark-item-time">{moment(bookmark.article.created_at).fromNow()}</i>
          </List.Description>
          <br />
          <List.Description to={`/article/${bookmark.article.slug}`} as={Link}>
            {bookmark.article.description}
          </List.Description>
          <br />
          <List.Description>
            <i className="bookmark-item-time">
                Bookmark added
              {' '}
              {moment(bookmark.created_at).fromNow()}
            </i>
          </List.Description>
          <br />
        </List.Content>
        <Popup content="Remove bookmark" trigger={<Button id={bookmark.id} onClick={e => (this.handleRemoveBookmark(e, bookmark.id))} className="bookmarkButton" icon="bookmark outline" size="small" />} />
      </List.Item>
    );
  }
}

BookmarkItem.propTypes = {
  bookmark: PropTypes.shape({
    id: PropTypes.number.isRequired,
    article: PropTypes.shape({
      description: PropTypes.string,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }).isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
  username: PropTypes.string.isRequired,
  removeBookmark: PropTypes.func.isRequired,
};

export default connect(
    null, {removeBookmark},
)(BookmarkItem);
