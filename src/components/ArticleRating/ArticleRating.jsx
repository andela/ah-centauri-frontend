import React from 'react';
import PropTypes from 'prop-types';
import {
  Rating,
  Form,
  TextArea,
  Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { updateRating } from '../../actions/ratingActions';

export class ArticleRating extends React.Component {
  constructor(props) {
    super(props);

    const { article, authUserRating } = this.props;

    this.state = {
      slug: article ? article.slug : '',
      value: authUserRating ? authUserRating.value : 0,
      review: authUserRating ? authUserRating.review : '',
      editRating: false,
    };
  }

  handleRating = (event, { rating, maxRating }) => {
    this.setState({ value: rating, maxRating });
  };

  handleInputChange = (event) => {
    const { value } = event.target;
    this.setState({ review: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { updateRating } = this.props;
    updateRating(this.state);

    this.setState({ editRating: false });

    document.querySelector('#edit_rating').style.display = 'inline-block';
  };

  shouldEditRating = () => !this.props.hasRating || this.state.editRating;

  toggleRating = (event) => {
    event.preventDefault();
    event.target.style.display = 'none';

    this.setState({ editRating: !this.state.editRating });
  }

  render() {
    return (
      <Form className="_rating" action="" onSubmit={this.handleSubmit}>
        <Form.Field>
          <Rating
            defaultRating={this.state.value}
            maxRating={5}
            onRate={this.handleRating}
            size="huge"
            disabled={!this.shouldEditRating()}
          />
          &nbsp;
          {' '}
          <a id="edit_rating" href="#" onClick={this.toggleRating}>edit</a>
        </Form.Field>

        {this.shouldEditRating() ? (
          <div>
            <Form.Field>
              <TextArea onChange={this.handleInputChange} className="rating" value={this.state.review} placeholder="Review..." />
            </Form.Field>
            <Button type="submit">Submit Rating</Button>
          </div>
        ) : ''}
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth_user_rating, has_rating } = state.articles.article;
  return {
    authUserRating: auth_user_rating,
    hasRating: has_rating,
  };
};

ArticleRating.defaultProps = {
  authUserRating: {},
  hasRating: false,
};

ArticleRating.propTypes = {
  updateRating: PropTypes.func,
  authUserRating: PropTypes.object,
  hasRating: PropTypes.bool,
};

export default connect(mapStateToProps, { updateRating })(ArticleRating);
