import { combineReducers } from 'redux';

import fetchReducer from './fetchrequests/reducer.js';
import userReducer from './users/reducer.js';
import { useReducer } from 'react';


export default combineReducers({  
  dataObj: fetchReducer,  
  userObj: userReducer,   
});
