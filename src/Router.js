import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {withRouter} from 'react-router';
import MainPage from './../src/components/pages/main-page'
import RequestModalForm from './components/items/form/request-modal-form'
//routing
const Router = () => (
    <Switch>        
        <Route exact path="/" component ={MainPage} />                
        <Route path="/Home" component ={MainPage} /> 
        <Route path="/Request" component ={RequestModalForm} />                        
        <Route path="/Request:id" component ={RequestModalForm} />                        
    </Switch>
)

export default Router;