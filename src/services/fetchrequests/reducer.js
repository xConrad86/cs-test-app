import { FETCH_REQUESTS } from './actionTypes';
import { UPDATE_REQUESTS } from './actionTypes';

const initialState = {
  requests: []
};
//przenies update tutaj! jeden zbior dla wszystkich... requests reducer nie ma sensu

export default function(state = initialState, action) {
  console.log("after:" , state, action);  
   if (state === undefined) {
      state = [];    
  }
  switch (action.type) {
    case FETCH_REQUESTS:          
    return {
        ...state,
        requests: action.payload
      };
    case UPDATE_REQUESTS:
        return {
          ...state,          
          requests: action.payload          
        };
    default:
      return state;
  }
}
