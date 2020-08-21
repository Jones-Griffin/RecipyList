// config/fire-config.js

import firebase from 'firebase';

const firebaseConfig = {
    apiKey: 'AIzaSyAbO3IJA2oQ35Wc5YRDmJMcPUW1FkUZzyc',
    authDomain: 'griffins-foodplanner.firebaseapp.com',
    databaseURL: "https://griffins-foodplanner.firebaseio.com",
    projectId: "griffins-foodplanner",
    storageBucket: "griffins-foodplanner.appspot.com",
    messagingSenderId: '226396313446',
    appId: '1:226396313446:web:d92b57f97245f3b165daa7'
  };


  try {
    firebase.initializeApp(firebaseConfig);
  } catch(err){
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)}
  }
  const fire = firebase;
  export default fire;