import { api } from '../utils/Api';
import { successMessage, failureMessage } from './authActions';
import {
  socialAuthentication, googleProvider,
  facebookProvider, twitterProvider,
} from '../firebase';


export const googleLogin = () => dispatch => socialAuthentication.signInWithPopup(googleProvider)
  .then((result) => {
  // This gives you a Google Access Token. You can use it to access the Google API.
    const token = result.credential.idToken;
    api.user.loginSocial(
      {
        url: 'google',
        payload: { google: { access_token: token } },
      },
    )
      .then((response) => {
        dispatch(successMessage(response.data.user));
      })
      .catch((error) => {
        dispatch(failureMessage(error.response.data));
      });
  }).catch((error) => {
  // Handle Errors here.
    return {
      errorCode: error.code,
      errorMessage: error.message,
      email: error.email,
      credential: error.credential,
    };
  });

export const twitterLogin = () => dispatch => socialAuthentication.signInWithPopup(twitterProvider)
  .then((result) => {
    // This gives you a Twitter  Access Token. You can use it to access the Twitter API.
    const { secret, accessToken } = result.credential;
    api.user.loginSocial({
      url: 'twitter',
      payload: {
        twitter: {
          access_token: accessToken,
          access_token_secret: secret,
        },
      },
    })
      .then((response) => {
        dispatch(successMessage(response.data.user));
      })
      .catch((error) => {
        dispatch(failureMessage(error.response.data));
      });
  }).catch((error) => {
    // Handle Errors here.
    return {
      errorCode: error.code,
      errorMessage: error.message,
      email: error.email,
      credential: error.credential,
    };
  });

export const facebookLogin = () => dispatch => socialAuthentication.signInWithPopup(facebookProvider)
  .then((result) => {
  // This gives you a Facebook  Access Token. You can use it to access the Facebook API.
    const token = result.credential.accessToken;
    api.user.loginSocial(
      {
        url: 'facebook',
        payload: { facebook: { access_token: token } },
      },
    )
      .then((response) => {
        dispatch(successMessage(response.data.user));
      })
      .catch((error) => {
        dispatch(failureMessage(error.response.data));
      });
  }).catch((error) => {
  // Handle Errors here.
    return {
      errorCode: error.code,
      errorMessage: error.message,
      email: error.email,
      credential: error.credential,
    };
  });
