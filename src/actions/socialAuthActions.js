import { api } from '../utils/Api';

import { socialAuthentication, googleProvider,
  facebookProvider, twitterProvider } from '../firebase';


export const googleLogin = () => (dispatch) => {
  return socialAuthentication.signInWithPopup(googleProvider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      api.user.loginSocial(
        { provider: 'google-oauth2', access_token: token, access_token_secret: '' })
        .then((response) => {
          console.log({ response: response.data });
        })
        .catch((error) => {
          // console.log(error);
        });
    }).catch((error) => {
    // Handle Errors here.
      console.log(
        {
          errorCode: error.code,
          errorMessage: error.message,
          email: error.email,
          credential: error.credential }
      );
    });
};

export const twitterLogin = () => {
  return dispatch => socialAuthentication.signInWithPopup(twitterProvider)
    .then((result) => {
    // This gives you a Twitter  Access Token. You can use it to access the Twitter API.
      const token = result.credential.accessToken;
      const { secret } = result.credential;
      console.log(result);
      api.user.loginSocial(
        { provider: 'twitter', access_token: token, access_token_secret: secret })
        .then((response) => {
          console.log({ response: response.data });
        })
        .catch((error) => {
          console.log(error)
        });
    }).catch((error) => {
    // Handle Errors here.
      console.log(
        {
          errorCode: error.code,
          errorMessage: error.message,
          email: error.email,
          credential: error.credential }
      );
    });
};

export const facebookLogin = () => {
  return dispatch => socialAuthentication.signInWithPopup(facebookProvider)
    .then((result) => {
    // This gives you a Facebook  Access Token. You can use it to access the Facebook API.
      const token = result.credential.accessToken;
      api.user.loginSocial(
        { provider: 'facebook', access_token: token, access_token_secret: '' })
        .then((response) => {
          console.log({ response: response.data });
        })
        .catch((error) => {
          console.log(error)
        });
    }).catch((error) => {
    // Handle Errors here.
      console.log(
        {
          errorCode: error.code,
          errorMessage: error.message,
          email: error.email,
          credential: error.credential }
      );
    });
};
