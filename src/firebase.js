import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: 'AIzaSyDGS9iqFB8so7mVvVK-tu7iGpcTminijlY',
  authDomain: 'authors-haven-centauri.firebaseapp.com',
  databaseURL: 'https://authors-haven-centauri.firebaseio.com',
  projectId: 'authors-haven-centauri',
  storageBucket: 'authors-haven-centauri.appspot.com',
  messagingSenderId: '348369896028',
  appId: '1:348369896028:web:fdd667d8ab58d96a'
};

firebase.initializeApp(firebaseConfig);

export const socialAuthentication = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
