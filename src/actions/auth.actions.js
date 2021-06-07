import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { SET_USER } from './constants';

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
            phoneNumber: user.phoneNumber,
            profilePic: '',
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            setDefaultProfilePic(currentUser.uid);
          })
          .then(() => {
            getSignedInUser();
          });
      })
      .catch(error => alert(error.message));
  };
};

const setDefaultProfilePic = uid => {
  const storage = firebase.storage();
  const defAvatar = storage.ref('images/').child(`defaultAvatar/avatar.png`);
  defAvatar
    .getDownloadURL()
    .then(url => {
      firebase.firestore().collection('users').doc(uid).set(
        {
          profilePic: url,
        },
        { merge: true }
      );
    })
    .catch(e => {
      console.log('error', e);
    });
};

// Sign In Action
export const signIn = user => {
  return async dispatch => {
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        dispatch(getSignedInUser());
      })
      .catch(error => alert(error));
  };
};

//Get Signed In User
export const getSignedInUser = () => {
  return async dispatch => {
    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          const user = {
            name: snapshot.data().name,
            email: snapshot.data().email,
            nfsCode: snapshot.data().nfsCode,
            vinNumber: snapshot.data().vinNumber,
            token: snapshot.data().token,
            phoneNumber: snapshot.data().phoneNumber,
            uid: snapshot.data().uid,
            profilePic: snapshot.data().profilePic,
          };

          dispatch({
            type: SET_USER,
            payload: { user },
          });
        }
      })
      .catch(error => console.log('error is:', error));
  };
};

// Logout

export const signOut = () => {
  return async => {
    firebase.auth().signOut();
  };
};
