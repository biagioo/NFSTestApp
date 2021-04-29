import { SET_USER } from '../actions/constants';

const initialState = {
  name: '',
  email: '',
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
