import { FETCH_REQUESTS } from './actionTypes';
import { UPDATE_REQUESTS } from './actionTypes';
import data from './../../data/data.json'

function actionCreator(requests) {  
  console.log("creator")
  return dispatch => {    
      dispatch(
        {
          type: FETCH_REQUESTS,
          payload: requests
        }
      )            
  }
}

export const updateRequests = requests => ({
  type: UPDATE_REQUESTS,
  payload: requests
});

function transformArray(reqs){
  var requests = [];
  reqs.forEach(req => {
    console.log("transform!", req)
    requests.push({
      Id : req.Id,
      RequestName: req.RequestName,
      Requestor: req.Requestor,
      GoodEnding: req.GoodEnding,
      Description: req.Description,
      NeedStoryteller:  req.NeedStoryteller,
      Storyteller:  req.Storyteller,
      WantedCharacters: req.WantedCharacters,
      Deadline: req.Deadline,
      Budget: req.Budget,
      Status: req.Status,
    });  
  });
    
  
  return requests;
}


export const fetchRequests = ( requests, sortBy, callback, subsiteNumber) => dispatch => { 
      
  var reqs = data.Requests
                        
  return dispatch(      
      actionCreator( reqs)
    );    
};

