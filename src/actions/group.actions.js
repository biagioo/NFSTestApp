import { GET_REALTIME_USERS, SET_MESSAGES } from './constants';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// get users collection
export const getRealtimeUsers = userNFSCode => {
  return async dispatch => {
    const db = firebase.firestore();
    db.collection('users').onSnapshot(snapshot => {
      const users = [];
      snapshot.forEach(doc => {
        if (doc.data().nfsCode !== userNFSCode) {
          users.push(doc.data());
        }
      });

      dispatch({
        type: GET_REALTIME_USERS,
        payload: { users },
      });
    });
  };
};

export const findChatAndMessages = customerEmail => {
  return async dispatch => {
    console.log('in find action');
    firebase
      .firestore()
      .collection('groups')
      .doc(customerEmail)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          // make call for messages
          getGroupMessages(customerEmail);
        } else {
          console.log('else', snapshot);
        }
      })
      .catch(err => {
        console.log('error:', err);
      });
  };
};

export const createGroup = groupInfo => {
  return async dispatch => {
    const db = firebase.firestore();
    db.collection('groups')
      .doc(groupInfo.customerEmail)
      .set(groupInfo)

      .catch(err => {
        console.log('uh oh', err);
      });
  };
};

export const getGroupMessages = (customerEmail, adminEmail) => {
  return async dispatch => {
    const db = firebase.firestore();
    db.collection('groups')
      .doc(customerEmail)
      .collection('messages')
      .onSnapshot(snapshot => {
        const messages = [];
        snapshot.forEach(doc => {
          // console.log(doc);
          if (
            doc.data().email === customerEmail ||
            doc.data().email === adminEmail
          ) {
            messages.push(doc.data());
          }
        });

        dispatch({
          type: SET_MESSAGES,
          payload: { messages },
        });
      });
  };
};
