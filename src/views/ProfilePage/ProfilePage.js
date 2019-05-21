import React from 'react';
import {Divider, Dropdown, Grid, Message, Tab, TextArea,} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CustomForm from '../../components/CustomForm/CustomForm';
import countryOptions from '../../utils/profile.constants';
import {getMyProfileAction, updateMyProfileAction} from '../../actions/profileActions';
import Avatar from '../../components/Profile/Avatar';
import CountLabel from '../../components/Profile/CountLabel';
import HeaderLayout from '../../components/layout/HeaderLayout';
import Footer from '../../components/layout/Footer';
import {setToastMessage} from '../../utils/errorMessage';
import requireAuth from '../../HOC/requireAuth';

// Create component class to load user highlight details in an accordion.


export class ProfilePage extends React.Component {
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
      readOnly: true,
      buttonName: 'Edit',
      visible: false,
      message: undefined,
    };

    this.handleInputChange.bind(this);
  }

  componentDidMount() {
    // Set the token for use in accessing the protected get Profile endpoint
    this.props.getMyProfileAction();
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { profile, message } = nextProps;
    this.setState({
      ...profile,
      message,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.authenticated !== prevProps.authenticated && this.props.authenticated) {
      this.props.getMyProfileAction();
    }
  }

  handleDismiss = () => {
    this.setState({ visible: false, message: undefined });
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      buttonName: 'Done',
    });
  };

  handleDropdownInputChange = statePropertyKey => (event) => {
    if (event.target.querySelector('.text') && event.target.querySelector('.text').textContent) {
      this.setState({
        [statePropertyKey]: event.target.querySelector('.text').textContent,
        buttonName: 'Done',
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      first_name, last_name, bio, website, country, phone, city,
    } = this.state;
    this.props.updateMyProfileAction({
      first_name,
      last_name,
      bio,
      website,
      country,
      phone,
      city,
    });
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
      },
      {
        labelCount: (profile.my_follow_count ? profile.my_follow_count.followerCount : 0),
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
        error: errorMessage && errorMessage.first_name,
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
        error: errorMessage && errorMessage.last_name,
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
        error: errorMessage && errorMessage.bio,
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
        error: errorMessage && errorMessage.phone,
      },
      {
        fluid: true,
        name: 'city',
        id: 'profileCity',
        placeholder: 'City',
        label: 'City',
        type: 'text',
        value: this.state.city,
        onChange: this.handleInputChange,
        error: errorMessage && errorMessage.city,
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
        error: errorMessage && errorMessage.country,
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
        error: errorMessage && errorMessage.website,
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
      { menuItem: 'Basic Info', render: () => <Tab.Pane id="ProfileBasicInfoTab" attached={false}>{profileForm}</Tab.Pane> },
      { menuItem: 'Highlights', render: () => <Tab.Pane id="ProfileHighlightsTab" attached={false} /> },
      { menuItem: 'Bookmarks', render: () => <Tab.Pane id="ProfileBookmarksTab" attached={false}>Bookmarks Content</Tab.Pane> },
    ];
    if (errorMessage) {
      setToastMessage(errorMessage);
    }
    if (authenticated) {
      return (
        <div>
          <section className="home">
            <HeaderLayout />
            <Grid columns="equal" divided verticalAlign="middle">
              {/* User avatar and follower data from the followers endpoint and the user Profile  */}
              <Avatar textAlign="center" spaced imageUrl={profile.image_url} username={profile.username} />
              <Grid.Column textAlign="center">
                {FollowCountLabels}
              </Grid.Column>
              <Divider />
              <Grid.Row>
                <Grid.Column>
                  {/* User Profile form tab that has all the user Profile data loaded from the Profile */}
                  {this.state.message
                    ? (
                      <Message
                        onDismiss={this.handleDismiss}
                        success
                        header={this.state.message}
                      />
                    ) : ''}
                  <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
                </Grid.Column>
              </Grid.Row>
            </Grid>

          </section>
          <Footer />
        </div>


      );
    }
    return (
      <div>
        <section className="home">
          <HeaderLayout />
          <Message negative>
            <Message.Header>You're not signed in!</Message.Header>
            <p>We can't load your details cause you're not signed in :( </p>
          </Message>

        </section>
        <Footer />
      </div>
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
  errorMessage: {},
  user: { username: '', email: '' },
};

ProfilePage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  message: PropTypes.string,
  errorMessage: PropTypes.object,
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

export default requireAuth(connect(
  mapStateToProps,
  { getMyProfileAction, updateMyProfileAction },
)(ProfilePage));
