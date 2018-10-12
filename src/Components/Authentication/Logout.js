import React, { Component } from 'react';
import firebase from '../../firebase/firebase'
import {NavLink} from 'reactstrap';

class LogOut extends Component {
  constructor() {
    super();
  this.logout = this.logout.bind(this);
}

  logout() {
        firebase.auth().signOut();
    }
  render() {
    return (
      <NavLink style={{color:'#fff'}} onClick={this.logout}>Déconnexion</NavLink>
    )
  }
}

 export default LogOut;
