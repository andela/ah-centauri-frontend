import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button, Comment, Form, Header,
} from 'semantic-ui-react';
import CommentItemComponent from './CommentItem';
import { setToastMessage } from '../../utils/errorMessage';

export class CommentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      replies: [],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.replies !== prevState.replies) {
      return {
        replies: nextProps.replies,
      };
    }
    return null;
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.errorMessage != prevProps.errorMessage) {
      setToastMessage(this.props.errorMessage);
    }
  }
  
  
  handleChange = (e) => {
    e.preventDefault();
    this.setState({comment: e.target.value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      slug: this.props.slug,
      payload: {
        comment: {
          body: this.state.comment,
        },
      },
    };
    this.props.createComment(data);
  };

  render() {
    const {
      slug, comments, getReplies, user, deleteComment, editComment, postReply, authenticated,
    } = this.props;
    return (
      <Comment.Group>
        <Header as="h3" dividing>Comments</Header>
        {comments.map(comment => (
          <CommentItemComponent
            comment={comment}
            slug={slug}
            getReplies={getReplies}
            deleteComment={deleteComment}
            editComment={editComment}
            postReply={postReply}
            authenticated={authenticated}
            replies={this.state.replies}
            user={user}
          />
        ))}
        {authenticated?
          <Form
            reply
            onSubmit={this.handleSubmit}
          >
            <Form.TextArea
              onChange={this.handleChange}
            />
            <Button
              content="Add Comment"
              labelPosition="left"
              icon="edit"
              primary
              type="submit"
            />
          </Form>: ''}
      </Comment.Group>

    );
  }
}

CommentComponent.defaultProps = {
  comments: [],
  replies: [],
};

CommentComponent.propTypes = {
  comments: PropTypes.array.isRequired,
  replies: PropTypes.array.isRequired,
  getReplies: PropTypes.func.isRequired,
  createComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
};

export const mapStateToProps = ({ comments }) => ({
  replies: comments.replies,
  errorMessage: comments.errorMessage,
});

export default connect(
  mapStateToProps,
)(CommentComponent);
