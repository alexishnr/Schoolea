import React, { Component } from 'react';
import * as routes from '../../routes'
import { Link, Route, withRouter } from 'react-router-dom';
import firebase from '../../firebase/firebase';
import {provider} from '../../firebase/firebase';


class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.loginFacebook = this.loginFacebook.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }



  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  login(e) {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
    }).catch((error) => {
        console.log(error);
      });
      this.props.history.push("/");
  }

  loginFacebook (){
    firebase.auth().signInWithPopup(provider).then((u)=>{
    }).catch((error) => {
        console.log(error);
      });
      this.props.history.push("/");
  }



  render() {


    return (
      <div style={{marginTop:'150px', marginLeft:'auto', marginRight:'auto'}} className="col-11">
        <form>
          <div>
            <label>Adresse email</label>
            <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div className="form-group" style={{marginTop:'20px'}}>
            <label>Mot de passe</label>
            <input value={this.state.password} onChange={this.handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1"/>
          </div>
          <div style={{margin:'auto', display:'flex', alignItems: 'center', justifyContent: 'center'}}>
          <button style={{marginRight:'8px', marginBottom:'30px'}}type="submit" onClick={this.login} className="btn btn-success">Se connecter</button>
          <button style={{marginLeft:'8px', marginBottom:'30px'}} type="submit" onClick={this.loginFacebook} className="btn btn-primary">Se connecter avec Facebook</button>
          </div>
        </form>
      </div>
    );
  }
}
export default withRouter(Login);
