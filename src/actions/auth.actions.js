import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { SET_USER } from './types';

// Sign Up Action
// pass user object in register function when calling this action
export const signUp = user => {
  return async dispatch => {
    const db = firebase.firestore();

    //  dispatch user sign up request ? optional

    firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(authUser => {
        authUser.user.updateProfile({
          displayName: user.name,
        });
      })
      .then(() => {
        const currentUser = firebase.auth().currentUser;
        db.collection('users')
          .doc(currentUser.uid)
          .set({
            email: user.email,
            uid: currentUser.uid,
            name: user.name,
            vinNumber: user.vinNumber,
            nfsCode: user.nfsCode,
          })
          .then(() => {
            const loggedInUser = {
              email: user.email,
              uid: currentUser.uid,
              name: user.name,
              vinNumber: user.vinNumber,
              nfsCode: user.nfsCode,
            };
            dispatch({
              type: SET_USER,
              payload: { user: loggedInUser },
            });
          });
      })
      .catch(error => alert(error.message));
  };
};

// Sign In Action
export const signIn = user => {
  return async dispatch => {
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .get()
          .then(snapshot => {
            if (snapshot.exists) {
              dispatch({
                type: SET_USER,
                payload: { user: snapshot.data() },
              });
            }
          });
      })
      .catch(error => alert(error));
  };
};
// isUserLoggedIn

// Logout
