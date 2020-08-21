// config/fire-config.js

import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'process.env.apiKey',
    authDomain: 'process.env.authDomain',
    databaseURL: "https://griffins-foodplanner.firebaseio.com",
    projectId: "griffins-foodplanner",
    storageBucket: "griffins-foodplanner.appspot.com",
    messagingSenderId: 'process.env.messagingSenderId',
    appId: 'process.env.appId'
  };


  try {
    firebase.initializeApp(firebaseConfig);
  } catch(err){
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)}
  }
  const fire = firebase;
  export default fire;