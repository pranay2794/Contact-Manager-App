import { combineReducers } from 'redux';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer
} from './userReducer';
import {
  contactListReducer,
  contactCreateReducer,
  contactUpdateReducer,
  contactDeleteReducer,
  contactDetailsReducer
} from './contactReducer';

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  contactList: contactListReducer,
  contactCreate: contactCreateReducer,
  contactUpdate: contactUpdateReducer,
  contactDelete: contactDeleteReducer,
  contactDetails: contactDetailsReducer,
});

export default rootReducer;
