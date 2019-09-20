import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import Rebase from 're-base';

const firebaseApp = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
