import { GET_REALTIME_USERS } from '../actions/types';

const initialState = {
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_REALTIME_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    default:
      return state;
  }
};
