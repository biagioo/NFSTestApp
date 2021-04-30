import { GET_REALTIME_USERS, SET_MESSAGES } from '../actions/constants';

const initialState = {
  users: [],
  messages: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_REALTIME_USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload.messages,
      };
    default:
      return state;
  }
};
