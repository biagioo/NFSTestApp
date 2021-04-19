import { GET_USER, USER_ERROR, SET_LOADING } from './types';
import firebase from 'firebase';

// get User from Firestore
export const getUser = () => dispatch => {
  try {
    setLoading();

    firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          dispatch({
            type: GET_USER,
            payload: snapshot.data(),
          });
        }
      });
  } catch (err) {
    dispatch({
      type: USER_ERROR,
      payload: err.response.data,
    });
  }
};

// Set Loading to True
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
