import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase/firebase';
import Login from './Login';
import SignUp from './SignUp'
import {NavLink} from 'reactstrap';
var removeHover = require('remove-hover')


class Sign extends Component {
  constructor(props) {
    super(props);
    this.state={
      formSignText: ''
    }
  }

  render() {

    return (

       <Link to="/Sign"  style={{ textDecoration: 'none' }}>
         <NavLink style={{color:'#fff'}}>
          Connexion / Inscription
         </NavLink>
       </Link>
    );
  }
}
export default Sign;
