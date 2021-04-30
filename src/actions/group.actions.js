import { GET_REALTIME_USERS } from './constants';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// get users collection
export const getRealtimeUsers = userNFSCode => {
  return async dispatch => {
    const db = firebase.firestore();
    db.collection('users').onSnapshot(querySnapshot => {
      const users = [];
      querySnapshot.forEach(doc => {
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

export const showGroups = () => {
  return async => {
    firebase.firestore().collection('groups');
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

export const getGroupMessages = customerEmail => {
  return aysnc => {
    const db = firebase.firestore();
    db.collection('groups').doc(customerEmail).collection('messages');
  };
};
