import { GET_REALTIME_USERS } from './constants';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// get users collection
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
      // .then(() => {
      //   startChat(groupInfo.customerEmail);
      // })
      .catch(err => {
        console.log('uh oh', err);
      });
  };
};

// export const startChat = customerEmail => {
//   return aysnc => {
//     const db = firebase.firestore();
//     db.collection('groups')
//     .doc(customerEmail)
//     .collection('messages')
//     .add()
//   };
// };

//create/ retrieve group

// export const createGroup = groupInfo => {
//   return async dispatch => {
//     const db = firebase.firestore();
//     await db.collection('groups')
//       .add({ chatWith: groupInfo.customerEmail })
//       .then(() => {
//         console.log('create group success');
//       })
//       .catch(err => {
//         console.log('uh oh', err);
//       });
//   };
// };
