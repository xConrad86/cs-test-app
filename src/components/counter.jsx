import React, { Component } from "react";

class Counter extends Component {

  //constructor(){
  //example how to refer to this
  //  this.handleIncrement = this.handleIncrement.bind(this);
  //} instead of that use => functions
  //functions in react are objects

  state = {
    value : this.props.counter.value
    
    , imgUrl : 'https://picsum.photos/200'
    , imgUrl2 : 'https://picsum.photos/201'
    , tags : ['Mileage','Reg date','Power']
  };

  styles = {
    fontSize : 10
    , fontWeight : "bold"
  };

  ulstyle = {
    display: "inline-block",
    paddingleft:"20px"   
  }

  btnstyle = {
    paddingbottom:"20px",
    display: "display-block"    
  }
  
  handleIncrement = () => {
  
    this.setState({value : this.state.value + 1});
  };  

  renderTags(){

    if(this.state.tags.length===0) return <p>Didnt find any tags...</p>;
    
    return <ul style={this.ulstyle}>{this.state.tags.map (tag=> <li key={tag}>{tag}</li>)}</ul>;
  };
//refers to counters ->h4
//{this.props.children} 
  render() {
    
    return (
      <div>        
        <div style={this.ulstyle}>
          {this.props.children}         
          <img src={this.state.imgUrl} alt=""/>
          
          <div style={this.ulstyle}>
            {this.renderTags()}
            {this.state.tags.length===0 && "Please create tags"}                
          </div>
          
          <div style={this.ulstyle}>
            <img src={this.state.imgUrl} alt=""/>
          </div>                       
        
        </div>

        <div>
          <div style={this.btnstyle}>
            <button onClick={this.handleIncrement} 
                    className="btn btn-secondary btn-sm">increase</button>
            
            <button onClick={this.handleIncrement} 
                    className="btn-bottom">mileage</button>          
            
            <button onClick={()=>this.props.onDelete(this.props.counter.id)}
              className="btn btn-danger btn-sm btn-m2">
              Delete
            </button>
            <span style={this.styles} className ={this.getBadgeClasses()}> {this.formatCount()}</span>   
          </div>
        </div>
      </div>
    )
    
    ;
  }

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += (this.state.value === 0) ? "warning" : "primary";
    return classes;
  }
  
  formatCount(){
    const {value} = this.state;
    const x = <h1>zero</h1>;
    return value === 0 ?  x : value;
  } 
}

export default Counter;
