import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getSingleUserProfileAction, handleFollow, handleUnFollow, getUserFollow,
} from '../../actions/profileActions';
import Footer from '../../components/layout/Footer';
import HeaderLayout from '../../components/layout/HeaderLayout';
import isEmpty from '../../utils/is_empty';
import CountLabel from '../../components/Profile/CountLabel';
import { filterByAuthorArticles } from '../../actions/articlesActions';
import MyArticleDraftFeed from '../../components/CustomArticle/MyArticleDraftFeed';


export class SingleProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      bio: '',
      website: '',
      country: '',
      phone: '',
      city: '',
      following: [],
      followers: [],
      followingCount: 0,
      followersCount: 0,
      currentProfile: {},
    };
  }

  componentDidMount() {
    // Set the token for use in accessing the protected get Profile endpoint
    // eslint-disable-next-line react/prop-types,no-shadow
    const {
      match,
      history,
      getSingleUserProfileAction,
      getUserFollow,
      filterByAuthorArticles,
    } = this.props;
    const { username } = match.params;

    if (!username) {
      history.push('/not-found');
    }
    getUserFollow(username, history);
    getSingleUserProfileAction(username);
    filterByAuthorArticles(username);
  }

  componentWillReceiveProps(nextProps, prevState) {
    const { profile, currentProfile } = nextProps;
    if (nextProps.profile.followers !== prevState.followers) {
      this.setState({
        ...profile,
        ...currentProfile,
      });
    }
    this.setState({
      ...profile,
      ...currentProfile,
    });
  }

  handleFollow = () => {
    const { match, history, handleFollow } = this.props;
    const { username } = match.params;

    handleFollow(username, history);
  };

  handleUnFollow = () => {
    const { match, history, handleUnFollow } = this.props;
    const { username } = match.params;

    handleUnFollow(username, history);
  };

  render() {
    const {
      profile,
      match,
      currentProfile,
      articles,
    } = this.props;

    const { username } = match.params;

    const { followers } = this.state;

    const followersList = followers.filter(follow => follow.username === currentProfile.username);

    const myFollowCountLabelData = [
      {
        labelCount: (this.state.followersCount),
        labelName: 'followers',
        iconName: 'users',
      },
      {
        labelCount: (this.state.followingCount),
        labelName: 'following',
        iconName: 'users',
      },
    ];
    const FollowCountLabels = myFollowCountLabelData.map(
      (countData, index) => (
        <CountLabel
          {...countData}
          key={index}
        />
      ),
    );

    return (
      <div>
        <section className="home">
          <HeaderLayout />
          <div className="row home">
            <div className="column">
              <div className="single-profile">
                <div className="single-profile__header">
                  <img
                    src={profile.image
                      ? `https://res.cloudinary.com/daniel2019/${profile.image}`
                      : 'https://img.icons8.com/bubbles/2x/user.png'}
                    alt=""
                  />
                  <h2>
                    {profile.username}
                  </h2>
                  <p>{profile.bio ? profile.bio : 'BIO is Empty'}</p>
                  <span>
                    {FollowCountLabels}
                  </span>
                  {isEmpty(followersList)
                    ? currentProfile.username !== username
                      ? (
                        <button
                          onClick={() => {
                            this.handleFollow();
                          }}
                        >
                          Follow
                        </button>
                      ) : ''
                    : (
                      <button
                        onClick={() => {
                          this.handleUnFollow();
                        }}
                      >
                        UnFollow
                      </button>
                    )
                  }
                </div>
                <div className="single-profile__content">
                  <div className="single-profile__content-header">
                    <h1>
                      Stories by
                      {' '}
                      {profile.username}
                    </h1>
                  </div>
                  <div className="row content_list">
                    <MyArticleDraftFeed articles={articles}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

SingleProfile.defaultProps = {
  profile: {},
  articles: [],
  errorMessage: {},
  currentProfile: {},
};

SingleProfile.propTypes = {
  message: PropTypes.string,
  errorMessage: PropTypes.object,
  articles: PropTypes.array,
  getSingleUserProfileAction: PropTypes.func.isRequired,
  handleFollow: PropTypes.func.isRequired,
  handleUnFollow: PropTypes.func.isRequired,
  getUserFollow: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.object,
  currentProfile: PropTypes.object,
  filterByAuthorArticles: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth, profile, articles }) => ({
  currentProfile: profile.current_profile,
  articles: articles.articles,
  authenticated: auth.authenticated,
  errorMessage: profile.errorMessage,
  profile: profile.profile,
  loading: profile.loading,
});

export default connect(
  mapStateToProps,
  {
    getSingleUserProfileAction,
    handleFollow,
    handleUnFollow,
    getUserFollow,
    filterByAuthorArticles,
  },
)(SingleProfile);
