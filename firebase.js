import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD_hY7ln70-ScZMitRzW22kZWLaBFwhm0s',
  authDomain: 'nfs-test-app.firebaseapp.com',
  projectId: 'nfs-test-app',
  storageBucket: 'nfs-test-app.appspot.com',
  messagingSenderId: '1050548907903',
  appId: '1:1050548907903:web:ba3252e9df066008d0344a',
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
