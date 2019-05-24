import React from 'react';
import {List} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import BookmarkItem from './BookmarkItem';
import {setToastMessage} from '../../utils/errorMessage';

export class BookmarkList extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.message !== prevProps.message) {
      setToastMessage(this.props.message);
    }
    if (this.props.errorMessage !== prevProps.errorMessage) {
      setToastMessage(this.props.errorMessage);
    }
  }

  render() {
    const {bookmarks, size} = this.props;
    const BookmarkItems = (bookmarks || []).map(bookmark => (
        <BookmarkItem bookmark={bookmark}/>
    ));
    return (
        <List size={size || 'large'} animated divided relaxed>
          {BookmarkItems}
        </List>
    );
  }
}

BookmarkList.propTypes = {
  bookmarks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    article: PropTypes.shape({
      description: PropTypes.string,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    }).isRequired,
    created_at: PropTypes.string.isRequired,
  })).isRequired,
  size: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  errorMessage: PropTypes.object.isRequired,
};

const mapStateToProps = ({bookmarks}) => ({
  message: bookmarks.message,
  errorMessage: bookmarks.errorMessage,
});

export default connect(
    mapStateToProps,
)(BookmarkList);
