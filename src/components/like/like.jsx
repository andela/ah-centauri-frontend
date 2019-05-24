import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getSingleArticles } from '../../actions/articlesActions';
import { likeArticle, dislikeArticle } from '../../actions/likeActions';


class likeDislikeButtons extends Component {
  constructor(props) {
    super(props);
    const { liked, disliked } = this.props;
    this.state = {
      liked,
      disliked,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if ((props.disliked !== state.disliked) || (props.liked !== state.liked)) {
      return {
        liked: props.liked,
        disliked: props.disliked,
      };
    }
    return null;
  }

  componentDidUpdate(props, state) {
    const { article } = this.props;
    if ((props.liked !== state.liked) || (props.disliked !== state.disliked)) {
      const { getSingleArticles } = this.props;
      getSingleArticles(article.slug);
    }
  }

  handleLike = (event) => {
    event.preventDefault();
    const { likeArticle, article } = this.props;
    likeArticle(article.slug);
  };

  handleDislike = (event) => {
    event.preventDefault();
    const { dislikeArticle, article } = this.props;
    dislikeArticle(article.slug);
  };

  render() {
    const {
      liked, disliked, dislikes, likes 
    } = this.props;
    return (

      <div>
        <div className="jssocials-share jssocials-share-like">

          {liked
            ? (
              <a onClick={this.handleLike} href="" className="like-active">
                <i className="fa fa-thumbs-o-up" />
                <span>
                  {likes}
                </span>
              </a>
            ) : (
              <a onClick={this.handleLike} href="" className="jssocials-share-link">
                <i className="fa fa-thumbs-o-up jssocials-share-logo" />
                <span>
                  {likes}
                </span>
              </a>
            )}
        </div>
        <div className="jssocials-share jssocials-share-like">
          {disliked 
            ? (
              <a type="" onClick={this.handleDislike} href="" className="like-active">
                <i className="fa fa-thumbs-o-down" />
                <span>
                  {dislikes}
                </span>
              </a>
            ) : (
              <a type="" onClick={this.handleDislike} href="" className="jssocials-share-link">
                <i className="fa fa-thumbs-o-down jssocials-share-logo" />
                <span>
                  {dislikes}
                </span>
              </a>
            )}
        </div>
      </div>
    );
  }
}


likeDislikeButtons.propTypes = {
  getSingleArticles: PropTypes.func.isRequired,
};

const mapStateToProps = ({ likes }) => ({
  article: likes.currentArticle,
  liked: likes.liked,
  likes: likes.likes,
  dislikes: likes.dislikes,
  disliked: likes.disliked,
  slug: likes.currentArticle.slug,
});

export default connect(mapStateToProps, {
  likeArticle, dislikeArticle, getSingleArticles,
})(likeDislikeButtons);
