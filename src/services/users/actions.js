import { LOAD_USERS } from './actionTypes';
import data from './../../data/data.json'

export const loadUsers = () => dispatch => {
  console.log("laduje users", data.Users);
  return dispatch (      
    actionCreator( data.Users)
  );      
};


function actionCreator(users) {  
  console.log("creator")
  return dispatch => {    
      dispatch(
        {
          type: LOAD_USERS,
          payload: users
        }
      )            
  }
}