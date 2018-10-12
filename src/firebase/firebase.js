import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database'

  export const config = {
    apiKey: "AIzaSyAr9JbzAIKrcTlfsNhh7yicib7z6vHdwoo",
    authDomain: "formation-project-e4a1b.firebaseapp.com",
    databaseURL: "https://formation-project-e4a1b.firebaseio.com",
    projectId: "formation-project-e4a1b",
    storageBucket: "formation-project-e4a1b.appspot.com",
    messagingSenderId: "886111239798"
  };


  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const db = firebase.database();
  const auth = firebase.auth();
  export const provider = new firebase.auth.FacebookAuthProvider();


  export default firebase
