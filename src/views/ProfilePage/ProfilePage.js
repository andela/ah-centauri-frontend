import React from 'react';
import {Link} from 'react-router-dom';
import {Divider, Dropdown, Grid, Message, Tab, TextArea,} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CustomForm from '../../components/CustomForm/CustomForm';
import HighlightsList from '../../components/Profile/HighlightsList';
import countryOptions from '../../utils/profile.constants';
import {getMyProfileAction, updateMyProfileAction} from '../../actions/profileActions';
import Avatar from '../../components/Profile/Avatar';
import CountLabel from '../../components/Profile/CountLabel';
import isEmpty from '../../utils/is_empty';

// Create component class to load user highlight details in an accordion.


export class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      bio: '',
      email: '',
      website: '',
      country: '',
      phone: '',
      city: '',
      readOnly: true,
      buttonName: 'Edit',
    };

    this.handleInputChange.bind(this);
  }

  componentDidMount() {
    // Set the token for use in accessing the protected get Profile endpoint
    this.props.getMyProfileAction();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { profile } = nextProps;
    this.setState({
      ...profile,
    });
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      buttonName: 'Done',
    });
  };

  handleDropdownInputChange = statePropertyKey => (event) => {
    this.setState({
      [statePropertyKey]: event.target.querySelector('.text').textContent,
      buttonName: 'Done',
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateMyProfileAction();
  };

  render() {
    const {
      authenticated, profile, loading, errorMessage,
    } = this.props;
    const myFollowCountLabelData = [
      {
        labelCount: (profile.my_follow_count ? profile.my_follow_count.followerCount : 0),
        labelName: 'followers',
        iconName: 'users',
        as: Link,
      },
      {
        labelCount: (profile.my_follow_count ? profile.my_follow_count.followerCount : 0),
        labelName: 'following',
        iconName: 'users',
        as: Link,
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

    // Make sure to set the readOnly to true
    const profileFormInputFields = [
      [{
        fluid: true,
        name: 'first_name',
        id: 'profileFirstName',
        placeholder: 'First name',
        label: 'First name',
        type: 'text',
        value: this.state.first_name,
        onChange: this.handleInputChange,
        error: !isEmpty(profile.errorMessage ? profile.errorMessage.first_name : ''),
      },
      {
        fluid: true,
        name: 'last_name',
        id: 'profileLastName',
        placeholder: 'Last name',
        label: 'Last name',
        type: 'text',
        value: this.state.last_name,
        onChange: this.handleInputChange,
        error: !isEmpty(profile.errorMessage ? profile.errorMessage.last_name : ''),
      }],
      {
        name: 'bio',
        id: 'profileBio',
        placeholder: 'What do you like to write? What do you like to read? Tell us more about you!',
        label: 'Your bio',
        rows: 2,
        control: TextArea,
        type: 'text',
        value: this.state.bio,
        onChange: this.handleInputChange,
        error: !isEmpty(profile.errorMessage ? profile.errorMessage.bio : ''),
      },
      [{
        fluid: true,
        name: 'phone',
        id: 'profilePhone',
        placeholder: 'Phone',
        label: 'Phone Number',
        type: 'text',
        value: this.state.phone,
        onChange: this.handleInputChange,
        error: !isEmpty(profile.errorMessage ? profile.errorMessage.phone : ''),
      },
      {
        fluid: true,
        name: 'country',
        id: 'profileCountry',
        label: 'Country',
        value: this.state.country,
        control: Dropdown,
        onChange: this.handleDropdownInputChange('country'),
        selection: true,
        search: true,
        deburr: true,
        options: countryOptions,
        placeholder: 'Select Your Country',
        error: !isEmpty(profile.errorMessage ? profile.errorMessage.country : ''),
      }],
      {
        fluid: true,
        name: 'website',
        id: 'profileWebsite',
        placeholder: 'Website',
        label: 'Website',
        type: 'text',
        value: this.state.website,
        onChange: this.handleInputChange,
        error: !isEmpty(profile.errorMessage ? profile.errorMessage.website : ''),
      },
    ];
    const profileForm = (
      <CustomForm
        className="profile-form"
        loading={loading}
        size="large"
        readOnly={this.state.readOnly}
        errorMessage={errorMessage}
        handleSubmit={this.handleSubmit}
        buttonName={this.state.buttonName}
        inputFields={profileFormInputFields}
      />
    );
    const panes = [
      { menuItem: 'Basic Info', render: () => <Tab.Pane attached={false}>{profileForm}</Tab.Pane> },
      { menuItem: 'Highlights', render: () => <Tab.Pane attached={false}><HighlightsList /></Tab.Pane> },
      { menuItem: 'Bookmarks', render: () => <Tab.Pane attached={false}>Bookmarks Content</Tab.Pane> },
    ];
    if (authenticated) {
      return (
        <div>
          {/* User avatar and follower data from the followers endpoint and the user Profile  */}
          <Grid stackable columns={2} divided verticalAlign="middle">
            <Grid.Row>
              <Avatar spaced imageUrl={profile.image_url} username={profile.username} />
              <Grid.Column textAlign="center">
                {FollowCountLabels}
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider />
          {/* User Profile form tab that has all the user Profile data loaded from the Profile */}
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </div>
      );
    }
    return (
      <Message negative>
        <Message.Header>You're not signed in</Message.Header>
        <p>We can't load your details cause you're not signed in :( </p>
      </Message>
    );
  }
}

ProfilePage.defaultProps = {
  profile: {
    username: '',
    first_name: '',
    last_name: '',
    bio: '',
    email: '',
    website: '',
    country: '',
    phone: '',
    city: '',
    my_follow_count: { followerCount: 0, followingCount: 0 },
  },
  user: { username: '', email: '' },
};

ProfilePage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  errorMessage: PropTypes.object.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  getMyProfileAction: PropTypes.func.isRequired,
  updateMyProfileAction: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    bio: PropTypes.string,
    email: PropTypes.string,
    website: PropTypes.string,
    country: PropTypes.string,
    phone: PropTypes.string,
    city: PropTypes.string,
    my_follow_count: PropTypes.shape({
      followerCount: PropTypes.number,
      followingCount: PropTypes.number,
    }),
  }),
  user: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
  }),
};

const mapStateToProps = ({ auth, profile }) => ({
  user: auth.user,
  authenticated: auth.authenticated,
  errorMessage: profile.errorMessage,
  profile: profile.current_profile,
  message: profile.message,
  loading: profile.loading,
});

export default connect(
  mapStateToProps,
  { getMyProfileAction, updateMyProfileAction },
)(ProfilePage);
