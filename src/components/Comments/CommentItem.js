import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Comment, Form, Button } from 'semantic-ui-react';

import { connect } from 'react-redux';
import LikeDislikeComments from '../like/likeComment';
import {
  getSingleComment,
} from '../../actions/likeActions';

export class CommentItemComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: 'false',
      reply: 'false',
      editedReply: '',
    };
  }

  nestedComments = () => this.props.replies.map(reply => (
    <CommentItemComponent
      comment={reply}
      slug={this.props.slug}
      getReplies={this.props.getReplies}
      deleteComment={this.props.deleteComment}
      editComment={this.props.editComment}
      postReply={this.props.postReply}
      replies={this.props.replies}
      user={this.props.user}
    />
  ));

  handleViewMoreReplies = (e) => {
    e.preventDefault();
    const data = {
      slug: this.props.slug,
      parent_id: e.target.parentElement.id,
    };
    window.id = e.target.parentElement.id;
    this.props.getReplies(data);
  }

  handleDeleteComment = (e) => {
    e.preventDefault();
    const data = {
      slug: this.props.slug,
      comment_id: e.target.parentElement.id,
    };
    this.props.deleteComment(data);
  }

  handleEdit = (e) => {
    e.preventDefault();
    this.setState({ edit: true });
  }

  handleReply = (e) => {
    e.preventDefault();
    this.setState({ reply: true });
  }

  handleEditChange = (e) => {
    e.preventDefault();
    this.setState({ editedReply: e.target.value });
  }

  handleEditSubmit = (e) => {
    e.preventDefault();
    const data = {
      slug: this.props.slug,
      comment_id: e.target.parentElement.id,
      payload: {
        comment: {
          body: this.state.editedReply,
        },
      },
    };
    this.props.editComment(data);
    this.setState({ edit: false });
  }

  handleReplySubmit = (e) => {
    e.preventDefault();
    const data = {
      slug: this.props.slug,
      payload: {
        comment: {
          parent: e.target.parentElement.id,
          body: this.state.editedReply,
        },
      },
    };
    this.props.postReply(data);
    this.setState({ reply: false });
  }

  /**
   *
   */
  render() {
    const { comment, user } = this.props;
    const data = {
      id: comment.id,
      slug: this.props.slug,
      likes: comment.likes,
      dislikes: comment.dislikes,
      likedComment: comment.has_liked,
      dislikedComment: comment.has_disliked,
    };

    return (
      <Comment key={comment.id}>
        <Comment.Content id={comment.id}>
          <Comment.Author as="a">{ comment.author }</Comment.Author>
          <Comment.Metadata>
            <div>{ moment(comment.created_at).format('h:mm a, Do MMMM YYYY') }</div>
          </Comment.Metadata>
          {this.state.reply === true
            ? (
              <Form
                reply
                onSubmit={this.handleReplySubmit}
              >
                <Form.TextArea
                  onChange={this.handleEditChange}
                  placeholder="add reply"
                />
                <Button
                  content="reply"
                  labelPosition="left"
                  icon="edit"
                  primary
                  type="submit"
                />
              </Form>
            )
            : ''}
          {this.state.edit === true
            ? (
              <Form
                reply
                onSubmit={this.handleEditSubmit}
              >
                <Form.TextArea
                  onChange={this.handleEditChange}
                  placeholder={comment.body}
                />
                <Button
                  content="edit comment"
                  labelPosition="left"
                  icon="edit"
                  primary
                  type="submit"
                />
              </Form>
            )
            : (
              <div>
                <Comment.Text>{ comment.body }</Comment.Text>
                <Comment.Actions id={comment.id}>
                  <Comment.Action>
                    <LikeDislikeComments data={data} />
                  </Comment.Action>
                  {(comment.parent === null && this.props.authenticated) ? <Comment.Action onClick={this.handleReply}>Reply</Comment.Action> : ''}
                  {user === comment.author ? <Comment.Action onClick={this.handleEdit}>Edit</Comment.Action> : ''}
                  {user === comment.author ? <Comment.Action onClick={this.handleDeleteComment}>Delete</Comment.Action> : ''}
                  {comment.replies !== 0
                    ? (
                      <Comment.Action id={comment.id} onClick={this.handleViewMoreReplies}>
                              View
                        {' '}
                        { comment.replies }
                        {' '}
                              replies
                        {' '}
                      </Comment.Action>
                    )
                    : ''}
                </Comment.Actions>
              </div>
            )
            }
        </Comment.Content>
        {window.id == comment.id ? (
          <Comment.Group>
            {' '}
            {this.nestedComments()}
            {' '}
          </Comment.Group>
        ) : ''}
      </Comment>
    );
  }
}

CommentItemComponent.defaultProps = {
  comments: [],
  replies: [],
};

CommentItemComponent.propTypes = {
  comments: PropTypes.array.isRequired,
  replies: PropTypes.array.isRequired,
  getReplies: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  getSingleComment: PropTypes.func.isRequired,
};


export default connect(null, {
  getSingleComment,
})(CommentItemComponent);
