import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import groupReducer from './group.reducer';

export default combineReducers({
  group: groupReducer,
  auth: authReducer,
});
