import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRequests, updateRequests } from '../../../services/fetchrequests/actions';
import {withRouter} from 'react-router-dom';
import { isArray } from 'jquery';

const DataRow = (props) =>{
    return props.keys.map((key, index)=>{
    return <td key={props.data.id}>{
        DataCheck(props.data[key])
        }</td>
    })
}

const DataCheck = (value) => {
    var valChanged = '';    
    if(value !== undefined && typeof(value) !== Boolean){
        if(isArray(value)===true){
            valChanged = value.slice(0,3)
            
        } else if(typeof(value) === "string") {
            valChanged = value.substring(0,49);
            
        } else {
            valChanged = value;            
        }
    }         
    return valChanged;
}

const compare = {
    asc: (a, b) => {
      if (a.Id < b.Id) return -1;
      if (a.Id > b.Id) return 1;
      return 0;
    },
    desc: (a, b) => {
      if (a.Id > b.Id) return -1;
      if (a.Id < b.Id) return 1;
      return 0;
    }
  };

class CSTable extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            pages: 0,
            currentPage: 1,
            sort: "asc",
        }
      
        this.getHeaders = this.getHeaders.bind(this);
        this.getData = this.getData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.filterQuantity = this.filterQuantity.bind(this);
        this.getQuantity = this.getQuantity.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
     //   this.handleFetchRequests = this.handleFetchRequests.bind(this);
    }

    static propTypes = {
        updateRequests: PropTypes.func.isRequired,                  
        requests: PropTypes.array.isRequired,
        fetchRequests: PropTypes.func.isRequired,    
        //newRequest: PropTypes.func.isRequired,          
      };

      filterQuantity(requests, quantity, subsiteNumber){                    
        subsiteNumber -= 1;
        let j =  Number(quantity)* Number(subsiteNumber);
        j = Number(j) + Number(quantity);
        console.log("ilosc na stronie:, " + requests.length, subsiteNumber, j);  
        if (requests.length > quantity ){
          if (subsiteNumber !== undefined){
            requests = requests.slice(quantity*subsiteNumber, j)
          } else {
            requests = requests.slice(0,quantity)
          }
        }        
        
        return requests;
    }
    

    componentDidMount(){
        console.log(this.state);
        this.handleFetchRequests();
    }
      
    
    componentWillReceiveProps(nextProps) {
        this.handleFetchRequests();
        console.log("nowe propsy");        
    }

    handleFetchRequests = (
      ) => {             
        if(this.props.requests === undefined || this.props.requests.length === 0) {
            this.props.fetchRequests();
        }
        //this.props.loadUsers();        
      };

    handleRequest = (request) => {
        const { requests} = this.props;                
        requests.push(request);        
        this.props.updateRequests(requests);          
        this.handleFetchRequests(); 
    }
     

    getHeaders = function(requests){     
        const reqs = this.filterQuantity(requests, 10, this.state.currentPage)
        console.log("headery", reqs);
        if (reqs !== undefined && reqs.length > 0 ) {
            var keys = Object.keys(reqs[0]);
            return keys.map((key, index)=>{
                    return <th key={key}>{key}</th>
            })
        }        
    }

    getData = (requests) => {
        const reqs = this.filterQuantity(requests, 10, this.state.currentPage)
        if (reqs !== undefined && reqs.length > 0 ){
            var keys = Object.keys(reqs[0]);
            return reqs.map((row, index)=>{
                return <tr key={index}><DataRow key={index} data={row} keys={keys}/></tr>
            })
        }         
    }
    handleInputChange(event) {
        this.setState({ [event.target.name]: event.target.value });
        console.log(event.target.name);
      }
    
      
      
      handleSortChange(val){
        this.setState({ sort: val });
        const { requests} = this.props; 
        var sortedRequests = requests;
        let b = false;
        
        
        sortedRequests = requests.sort(compare[val]);
        
        this.props.updateRequests(sortedRequests); 

      }

      getQuantity (reqLen, quantityToShow)   {
        var x = 1
        if (reqLen > 0){
           x = reqLen / quantityToShow
        }
         x = Math.ceil(x);
         return x
     }

    render()  {       
        const showPage = this.state.currentPage;     
        const requests = this.props.requests;
        
        return (
        <React.Fragment>
        <div className="main-section-btns-oper">
          <button 
           onClick={() => this.handleSortChange( this.state.sort === "asc" ? "desc" : "asc"  )}
           className="main-section-btns-oper-btn">Sort & Filter</button>
          <button className="main-section-btns-oper-btn">Reload</button>
          <button className="main-section-btns-oper-btn">
            Prepare table for excel report
          </button>
          <span className="main-section-btns-oper-txt">
            Request completed. Result content: 4.
          </span>
          <span className="main-section-btns-oper-txt">
            Sorted by id: {this.state.sort}
          </span>
        </div>        
        <div>
            Page  {this.state.currentPage}  of  {this.getQuantity(requests.length, 10)}
            <span> </span>
            Go to page  <input
              type="number"     
              name="currentPage"                                                   
              style={{width:"50px"}}
              //value={this.state.Budget}              
              onChange={this.handleInputChange}
          ></input>               
        </div>
        <table className="table table-bordered table-hover" width="100%">        
            <thead>
                <tr>
                    {this.getHeaders(requests)
                    }
                </tr>
            </thead>
            <tbody>
                { this.getData(requests)
                }
            </tbody> 
    </table>
    </React.Fragment>
    ) 
    }
          
  }
  
  const mapStateToProps = state => ({         
    requests: state.dataObj.requests,           
  });
  
  export default connect(mapStateToProps,  { updateRequests, fetchRequests }  )(CSTable);