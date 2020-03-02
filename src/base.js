import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDIZ3q_lBVpDe9_mimC_3b_lU1T9oBQ99c",
  authDomain: "catch-of-the-day-ac5f2.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-ac5f2.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;
