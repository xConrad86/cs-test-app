import React from 'react';
import "react-datepicker/dist/react-datepicker.css";
import {NavLink, BrowserRouter} from 'react-router-dom';
import Router from './Router';

const Navigation = () => 
<div>
  <nav> 
    <ul>
      <li>
        <NavLink to="/Home">Home</NavLink>  
      </li>
      <li>
        <NavLink to="/Request">Form</NavLink>
      </li>          
    </ul>
  </nav>
</div>

function App() {
  return (
      <BrowserRouter>    
      
      <React.Fragment>   
        <Navigation />
        <Router />
      </React.Fragment>
    </BrowserRouter>    
  );
}

export default App;
{/* <div className="App">
      <header className="App-header">        
      </header>
      <MainPage/>
    </div> */}