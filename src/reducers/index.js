import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import userReducer from './userReducer';

export default combineReducers({
  user: userReducer,
  auth: authReducer,
});
