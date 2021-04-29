import { GET_REALTIME_USERS } from './constants';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const getRealtimeUsers = uid => {
  return async dispatch => {
    const db = firebase.firestore();
    db.collection('users').onSnapshot(querySnapshot => {
      const users = [];
      querySnapshot.forEach(doc => {
        if (doc.data().uid !== uid) {
          users.push(doc.data());
        }
      });
      // console.log(users);

      dispatch({
        type: GET_REALTIME_USERS,
        payload: { users },
      });
    });
  };
};
