import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchRequests } from '../../../services/fetchrequests/actions';
import {withRouter} from 'react-router-dom';

const DataRow = (props) =>{
    return props.keys.map((key, index)=>{
    return <td key={props.data[key]}>{props.data[key]}</td>
    })
}

class CSTable extends React.Component{
    constructor(props){
        super(props)

        this.getHeaders = this.getHeaders.bind(this);
        this.getData = this.getData.bind(this);
     //   this.handleFetchRequests = this.handleFetchRequests.bind(this);
    }

    static propTypes = {
        updateRequests: PropTypes.func.isRequired,          
        dataJson: PropTypes.object.isRequired, 
        requests: PropTypes.array.isRequired,
        fetchRequests: PropTypes.func.isRequired,    
        newRequest: PropTypes.func.isRequired,          
      };
    

    componentDidMount(){
        console.log(this.state);
        this.handleFetchRequests();
    }
      
    
    componentWillReceiveProps(nextProps) {
        this.handleFetchRequests();
        console.log("nowe propsy");
        // if (nextProps.newRequest !== this.props.newRequest) {
        //   //this.addFilter(nextProps.newFilter);
        // }    
        // if (nextProps.filterToRemove !== this.props.filterToRemove) {
        //   this.removeFilter(nextProps.filterToRemove);
        // }
    }

    handleFetchRequests = (requests
    //    requests = this.props.requests,                    
      ) => {             
        this.props.fetchRequests(requests);
      };

    handleRequest = (request) => {
        const { requests} = this.props;                
        requests.push(request);        
        this.props.updateRequests(requests);          
        this.handleFetchRequests(requests); 
    }
     

    getHeaders = function(requests){     
        console.log("headery", requests);
        if (requests !== undefined && requests.length > 0 ) {
            var keys = Object.keys(requests[0]);
            return keys.map((key, index)=>{
                    return <th key={key}>{key}</th>
            })

        }
        
    }

    getData = (requests) => {
        
        if (requests !== undefined && requests.length > 0 ){
            var keys = Object.keys(requests[0]);
            return requests.map((row, index)=>{
                return <tr key={index}><DataRow key={index} data={row} keys={keys}/></tr>
            })
        }         
    }

    render()  {            
        const {requests} = this.props;
        return (
        <React.Fragment>
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
 //   newRequest: state.dataObj.requestToAdd,        
    requests: state.dataObj.requests,          
  });
  
  export default connect(mapStateToProps,  { fetchRequests }  )(CSTable);