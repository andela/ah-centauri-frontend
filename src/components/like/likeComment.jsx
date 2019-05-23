import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Comment } from 'semantic-ui-react';

import {
  dislikeComment,
  getSingleComment,
  likeComment,
} from '../../actions/likeActions';
import { setToastMessage } from '../../utils/errorMessage';

class likeDislikeComments extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { data } = this.props;
    this.props.getSingleComment(data);
  }

  handleLike = (event) => {
    event.preventDefault();
    const { data } = this.props;
    this.props.likeComment(data);
  };

  handleDislike = (event) => {
    event.preventDefault();
    const { data } = this.props;
    this.props.dislikeComment(data);
  };

  render() {
    const { data } = this.props;

    return (
      <div>
        <Comment.Action>
          {data.likedComment
            ? (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <div>
                <Icon onClick={this.handleLike} name="thumbs up" />
                <span>
                  {data.likes}
                </span>
              </div>

            ) : (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <div>
                <Icon onClick={this.handleLike} name="thumbs up outline" />
                <span>
                  {data.likes}
                </span>
              </div>

            )}
        </Comment.Action>
        <Comment.Action>
          {data.dislikedComment
            ? (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <div>
              <Icon onClick={this.handleDislike} name="thumbs down" />
                <span>
                  {data.dislikes}
                </span>
              </div>
            ) : (
              // eslint-disable-next-line jsx-a11y/anchor-is-valid
              <div>
              <Icon onClick={this.handleDislike} name="thumbs down outline" />
                <span>
                  {data.dislikes}
                </span>
              </div>
            )}
        </Comment.Action>
      </div>
    );
  }
}


likeDislikeComments.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
  likeComment: PropTypes.func.isRequired,
  dislikeComment: PropTypes.func.isRequired,
  getSingleComment: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ likes }) => ({
  errorMessage: likes.errorMessage,
});

export default connect(mapStateToProps, {
  likeComment, dislikeComment, getSingleComment,
})(likeDislikeComments);


export const LikeDislike = likeDislikeComments;
