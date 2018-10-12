import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase/firebase';
import Login from './Login';
import SignUp from './SignUp'

class Sign extends Component {
  constructor(props) {
    super(props);
    this.state={
      formSignText: ''
    }
  }

  render() {

    return (
       <div className="col-md-8">
         <Link to="/Sign">
           <button style={{backgroundColor:'#4A4A4A', maxWidth:'248px', fontSize:'13px', color:'#fff', padding:'12px'}} type="submit"  className="btn "> Se connecter pour plus d'informations</button>
         </Link>
       </div>
    );
  }
}
export default Sign;
