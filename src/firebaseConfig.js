import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/firestore';

// firebase init goes here
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_UR,
  projectId: process.env.VUE_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MSG_SENDERID,
  appId: process.env.VUE_APP_FIREBASE_APPID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENTID,
};
firebase.initializeApp(firebaseConfig);

// firebase utils
const db = firebase.firestore();
const auth = firebase.auth();
const { currentUser } = auth;

// date issue fix according to firebase

// firebase collections
const usersCollection = db.collection('users');
const postsCollection = db.collection('posts');
const viewsCollection = db.collection('views');

export {
  db,
  auth,
  currentUser,
  usersCollection,
  postsCollection,
  viewsCollection,
};
