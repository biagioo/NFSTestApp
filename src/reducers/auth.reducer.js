import { SET_USER } from '../actions/types';

const initialState = {
  name: '',
  email: '',
  uid: '',
  vinNumber: '',
  nfsCode: '',
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload.user,
      };
      break;
    default:
      return state;
  }
};
