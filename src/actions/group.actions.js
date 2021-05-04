import { GET_REALTIME_USERS } from './constants';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// get users collection
export const getRealtimeUsers = userNFSCode => {
  return async dispatch => {
    const db = firebase.firestore();
    db.collection('users')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
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

//create group in firestore
export const createGroup = groupInfo => {
  return async => {
    const db = firebase.firestore();
    db.collection('groups')
      .doc(groupInfo.customerEmail)
      .set(groupInfo)

      .catch(err => {
        console.log('uh oh', err);
      });
  };
};
