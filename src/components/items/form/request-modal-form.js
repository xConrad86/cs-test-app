import React from "react";
import "./request-form.scss";
import PropTypes from "prop-types";
//import "@kenshooui/react-multi-select/dist/style.css"
//data
import { Multiselect } from "multiselect-react-dropdown";
import ReactDataPicker from "react-datepicker";
import { connect } from 'react-redux';
import { updateRequests, fetchRequests} from '../../../services/fetchrequests/actions';
import "./ms-styles.css";
import { loadUsers } from '../../../services/users/actions';
import { isArray } from "jquery";
import { useHistory } from "react-router-dom";

//https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefautocomplete

//https://codesandbox.io/s/react-dropdown-forked-b9gj6?file=/src/index.js
class RequestModalForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: {},
      Id: "",
      RequestName: "",
      Requestor: "",
      GoodEnding: "",
      Description: "",
      NeedStoryteller: false,
      Storyteller: "",      
      Deadline: new Date(),
      Budget: "",      
      Status: "",
      showModal: false,
      //arrays      
      WantedCharacters: [],
      selectedValues: [],  
      statuses: [],
      
    };

    this.statuses = ['hidden', 'disabled'];
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBudgetChange = this.handleBudgetChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getRnd = this.getRnd.bind(this);
    this.onSelectSingle = this.onSelectSingle.bind(this);
    this.onSelectStatus = this.onSelectStatus.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.getUsers = this.getUsers.bind(this);    
    this.validateForm = this.validateForm.bind(this);    
    this.checkValue = this.checkValue.bind(this);    
    this.handleGEChange = this.handleGEChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.saveAsDraft = this.saveAsDraft.bind(this);    
    this.reqCancel = this.reqCancel.bind(this); 
  }

  static propTypes = {
  //  record: PropTypes.object.isRequired,
    updateRequests: PropTypes.func.isRequired,
    requests: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
  };

  componentDidMount() {
    if (this.props.record !== undefined) {
      this.setState({ record: this.props.record });
      this.setState({ requestName: this.props.record.name });
    }

    this.props.loadUsers();  
    var wantedCharacters = [];
    if (this.wantedCharacters === undefined) {
      for (let i = 1; i <= 100; i++) {
        let x = this.getRnd(5, 10);
        var text = "";
        for (let j = 1; j <= x; j++) {
          text += String.fromCharCode(this.getRnd(64, 90));
        }
        wantedCharacters.push(text);
      }
      console.log(wantedCharacters);
      this.setState({ wantedCharacters: wantedCharacters });
    }
  }

  getRnd(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  handleChange(selectedItems) {
    this.setState({ selectedItems });
  }

  showModalHandler = (event) => {
    this.setState({ showModal: true });
  };

  hideModalHandler = (event) => {
    this.setState({ showModal: false });
  };

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.name);
  }

  handleBudgetChange(event) {
    if (event.target.value <= 0) {
      alert("Budget must be higher than 250 000 Fable dollars");
      this.setState({ Budget: "" });
    } else {
      this.setState({ Budget: event.target.value });
    }
  }

  handleGEChange(objVal ) {
    this.setState({ GoodEnding: objVal });
    
  }

  saveAsDraft() {           
    this.handleSubmit();
    
  }
  renderGroups() {
    return this.subGroups.map((subGroup) => (
      <option value={subGroup}> {subGroup} </option>
    ));
  }


  onSelect(selectedList) {    
    this.setState({ selectedValues: selectedList });    
  }  

  onSelectSingle(selectedItem) {
    console.log(selectedItem);
    this.setState({ Requestor: selectedItem[0] });
  }

  onSelectStatus(selectedItem) {
    console.log(selectedItem);
    this.setState({ Status: selectedItem });
  }

  onRemove(selectedList) {
    
    this.setState({ selectedValues: selectedList });
  }

  handleSubmit() {
    var requests = this.props.requests;
    console.log(requests);
    var id = 0;
      for(var i =0; i < requests.length; i++){
        var r = requests[i];
        if ( r.Id > id){
          id = r.Id
          } 
        }
      
    
    id += 1;
    console.log("modal reqs", this.props.requests, this.state);
    var currentstatus = "";
    if(this.state.Status === undefined || this.state.Status === "") {
      currentstatus = "draft"
    } else {
      currentstatus = this.state.Status
    }

    requests.push({
      Id : id,
      RequestName: this.state.RequestName,
      Requestor: this.state.Requestor,
      GoodEnding: this.state.GoodEnding,
      Description: this.state.Description,
      NeedStoryteller:  this.state.NeedStoryteller,
      Storyteller:  this.state.Storyteller,
      WantedCharacters: this.state.selectedValues,
      Deadline: this.state.Deadline,
      Budget: this.state.Budget,
      Status: currentstatus,
    });
    this.props.updateRequests(requests)
    alert("Request added to database.");
   this.props.history.push("/Home")    
  //  window.location.replace("/Home")
  }

  checkValue(value){
    var validated = true;
    if(isArray(value)===false){
      if (value === ''){
        validated = false;
      }
    } else {
      if(value.length=0){
        validated = false;
      }
    }
    console.log(value, validated)
    return validated;
  }

  validateForm(){
     var b = this.checkValue(this.state.RequestName)
     if (b === true) {
       b = this.checkValue(this.state.Requestor);
       if (b === true) {
         b = this.checkValue(this.state.GoodEnding);
         if (b === true) {
           b = this.checkValue(this.state.Description);
           if (b === true) {
             b = this.checkValue(this.state.NeedStoryteller);
             if (b === true || this.state.NeedStoryteller) {
               b = this.checkValue(this.state.Storyteller);
             }
            
             if (b === true) {
               b = this.checkValue(this.state.Deadline);
             }
             if (b === true) {
               b = this.checkValue(this.state.Budget);
             }
             if (b === true) {
               b = this.checkValue(this.state.Status);
             }
           }
         }
       }
     }
    if (b===false) {
        alert("Form not validated. Please fill objects properly.");

    } else {
      this.handleSubmit();
    }
    

  }

  getUsers(users){
    var usersNames = [];
    
    for(var i =0; i < users.length; i++){
        usersNames.push(users[i].DisplayName)
    }
    return usersNames;

  }

  handleChangeDate (date) {
    this.setState({
      Deadline: date
    });
  };

  reqCancel () {
    alert("Request cancelled.");
  }

  render() {
    const users = this.props.users;
    
    return (
      
        <div className="product-form-items">          
          <div className="main-form-header">Matter submission</div>
          <div className="form-label">Request name</div>
          <input
            type="text"
            name="RequestName"
            className="form-obj"
            maxLength="255"            
            onChange={this.handleInputChange}
          ></input>

          
            <div className="form-label">Requestor</div>
            <div>
              <Multiselect
                singleSelect={true}
                options={this.getUsers(users)} // Options to display in the dropdown
                onSelect={this.onSelectSingle} // Function will trigger on select event              
                avoidHighlightFirstOption={true}
                isObject={false}
              />
            </div>          

          <div className="form-label">Wanted characters</div>
            <div>
              <Multiselect
                options={this.state.wantedCharacters} // Options to display in the dropdown
                selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                onSelect={this.onSelect} // Function will trigger on select event
                onRemove={this.onRemove} // Function will trigger on remove event
                displayValue="wantedCharacters" // Property name to display in the dropdown options
                showCheckbox={true}
                isObject={false}
                closeOnSelect={false}
                avoidHighlightFirstOption={true}
                style={{ chips: { background: "black" } }}
              />
            </div>
          
        
          <div className="form-label">Good Ending</div>
          <div className="form-obj-multi">                                   
            <div className="form-radio-label">
              <button
                name="GoodEnding"
                onClick={() => this.handleGEChange("Yes")}
                className={ this.state.GoodEnding === "Yes" ? "form-obj-radio-checked" : "form-obj-radio"}>              
              </button>
                Yes
                <button 
                name="GoodEnding"
                onClick={() => this.handleGEChange("Depends")}
                className={ this.state.GoodEnding === "Depends" ? "form-obj-radio-checked" : "form-obj-radio"}>                          
              </button>
                Depends
                <button 
                name="GoodEnding"
                onClick={() => this.handleGEChange("No")}
                className={ this.state.GoodEnding === "No" ? "form-obj-radio-checked" : "form-obj-radio"}>                          
              </button>
                No
            </div>            
          </div>

          <div className="form-label">Description</div>
          <textarea
            name="Description"
            
            className="form-obj-desc"
            min="250"            
            max="65001"            
            onChange={this.handleInputChange}
            >
           </textarea>
           
           <div className="form-obj-multi">                                   
            <div className="form-radio-label">
              <button 
                onClick={() =>  this.setState({
                  NeedStoryteller: !this.state.NeedStoryteller
                })}
                className={ this.state.NeedStoryteller === true ? "form-obj-checkbox-checked" : "form-obj-checkbox"}>                          
                V
              </button>
              Need Storyteller

            </div>  
            {
             this.state.NeedStoryteller === true ? 
                <div className="form-obj-multi"> 
                  <div className="form-label">Storyteller</div>                  
                  <input
                    type="text"
                    name="Storyteller"
                    className="form-obj"
                    maxLength="255"            
                    onChange={this.handleInputChange}
                  ></input>
                </div>
              : null

            }
          </div>          
          <div className="form-label">Deadline</div>
          <div className="form-obj-date">
            <ReactDataPicker
              className="form-control"
               selected={this.state.Deadline}
              onChange={this.handleChangeDate}
              dateFormat="dd/MM/yyyy"
            />
          </div>
          <div className="form-label">Budget</div>
          <input
              type="number"
              name="Budget"
              className="form-obj"
              placeholder="In Fable Dollars (FBD), no less than 250000"
              min="250000"              
              //value={this.state.Budget}              
              onChange={this.handleInputChange}
          ></input>            

          <div className="form-label">Status</div>
          <div>
              <Multiselect
                singleSelect={true}
                options={this.statuses} // Options to display in the dropdown
                onSelect={this.onSelectStatus} // Function will trigger on select event              
                avoidHighlightFirstOption={true}
                isObject={false}
              />
            </div>       
          <div>
            <button 
            className="main-form-btn-create"
            onClick={this.validateForm}>
              Submit
            </button>
            <button
            onClick={this.reqCancel}
            className="main-form-btn-create">Cancel</button>
            <button 
            onClick={this.saveAsDraft}
            className="main-form-btn-create">Save as draft</button>
          </div>
        </div>
      
    );
  }
}

const mapStateToProps = state => ({  
  users: state.userObj.users,  
  requests: state.dataObj.requests,  
});

export default connect(mapStateToProps,  {updateRequests, loadUsers}  )(RequestModalForm);


