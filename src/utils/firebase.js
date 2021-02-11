import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";
import "firebase/firestore";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: "musicfy-dev-24103.appspot.com",
  });
}

export default firebase;
