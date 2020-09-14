import { LOAD_USERS,              
         } from './actionTypes';

const initialState = {
  users: []
};

export default function(state = initialState, action) {
  
  console.log("before:" , state, action);
    
  switch (action.type) {
    case LOAD_USERS:      
      return {
        ...state,
          users: action.payload                
      };     

    default:      
      return state;
  }  
}
