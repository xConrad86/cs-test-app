import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import RequestModalForm from './../form/request-modal-form'
import './style.scss';
import { withRouter } from 'react-router-dom'

class MainSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      record: [],      
    };
  }

  toggleModal = (record, event) => {
 //   const { isOpen } = this.state;
 //   this.setState({ isOpen: !isOpen, record: record });
    this.props.history.push('/Request');    
  };

  render() {
    const { isOpen } = this.state;
    return (
      <div>
        <h1 className="main-section-header">Online Reporting - GCMC</h1>
        <div>
          <button  onClick={this.toggleModal} className="main-section-btn-create">Create new matter</button>        
        </div>
        <hr className="main-section-line" />
        <h2 className="main-section-second-header">My team active items</h2>       
      </div>
    );
  }
}

export default withRouter(MainSection);

/* 

<Modal
id="modal_with_forms"
isOpen={isOpen}            
closeTimeoutMS={150}
contentLabel="modalA"
shouldCloseOnOverlayClick={false}
onRequestClose={this.toggleModal}
ariaHideApp={false}
className="modal-form"            
aria={{
  labelledby: "heading",
  describedby: "fulldescription",
}}
>
<div className="modal-form-top-sec">
  <div className="modal-form-close-sec">
    <button
      className="modal-form-close-sec-btn"
      onClick={() => this.setState({ isOpen: false })}
    >
      Close
    </button>
  </div>
  <div className="modal-form-title">
    <h1 id="heading">Add request</h1>
    <p>Fill mandatory fields</p>
  </div>
</div>
<div id="fulldescription" tabIndex="0" role="document">
  <RequestModalForm record={Object.assign({}, this.state.record)} />
</div>
</Modal> */