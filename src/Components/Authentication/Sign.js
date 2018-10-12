import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase/firebase';
import Login from './Login';
import SignUp from './SignUp'
import NavBar from '../NavBar'
import { Container, Row, Col, Card, Button, Nav, NavItem, NavLink,Popover, PopoverHeader, PopoverBody, Input  } from 'reactstrap';


class Sign extends Component {
  constructor(props) {
    super(props);
    this.state={
      formSign: false,
      formSignText: ''
    }
    this.handleForm=this.handleForm.bind(this)
  }

  handleForm() {
 this.setState({
   formSign: !this.state.formSign,
    })
  }



  render() {

    if(this.state.formSign === true){
      this.state.formSignText= 'Pas encore inscrit?'}
      else{
        this.state.formSignText= 'Vous êtes déja inscrit?'
      }

    return (
      <div style={{margin:'0px', overflow:'hidden'}}>
        <NavBar/>
        <Container>
          <Row>
           <div style={{display:'flex', flexDirection:'column',                 alignItems:'center',justifyContent:'center', margin:'auto'}} className="col-9">
             <div>{this.state.formSign ? ( <Login/>) : (<SignUp />) }</div>
               <button style={{backgroundColor:'#353A3F', color:'#fff', marginBottom:'50px'}} className="btn" onClick={this.handleForm}>{this.state.formSignText}</button>
            </div>
           </Row>
         </Container>
       </div>
    );
  }
}
export default Sign;
