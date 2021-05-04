import { GET_REALTIME_USERS, GET_REALTIME_GROUPS } from '../actions/constants';

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
