import React, { Component } from 'react';
import firebase, {provider} from '../../firebase/firebase';
import { Link, Route, withRouter } from 'react-router-dom';
const auth = firebase.auth()

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.signup = this.signup.bind(this);
    this.loginFacebook = this.loginFacebook.bind(this);
    this.state = {
      userName: '',
      firstName: '',
      lastName:'',
      email: '',
      passwordOne: '',
      passwordTwo:'',
      error:'',
      user:'',
      userID:''
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user, userExist: true });
        localStorage.setItem('user', user.uid);

      } else {
        this.setState({ user: null, userExist: false });
        localStorage.removeItem('user');
      }
    });
  }

  signup(e){
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.passwordOne).then((u)=>{
    })
    .catch((error) => {
        console.log(error);
        this.setState({
          error:error.message
        })
      }).then(() =>
      firebase.database().ref('Users/-').push().set(
          {
              UserName: this.state.userName,
              FirstName: this.state.firstName,
              LastName: this.state.lastName,
              Email: this.state.email,
              Domaine: this.state.domaine,
              Ville: this.state.ville,
              Scholarship: this.state.scholarship,
           }
         )
       )
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

    const isInvalid =
      this.state.passwordOne !== this.state.passwordTwo ||
      this.state.passwordOne === '' ||
      this.state.email === '' ||
      this.state.firstName === '' ||
      this.state.lastName === '' ||
      this.state.userName === '' ;
    return (
      <div style={{marginTop:'150px', marginLeft:'auto', marginRight:'auto'}} className="col-11">
        <form>
          <div>
            <div className="form-group">
              <label>Adresse email</label>
              <input value={this.state.email} onChange={this.handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              <small id="emailHelp" className="form-text text-muted">Nous ne partagerons jamais vos informations à des fins publicitaires.</small>
            </div>
            <div className="form-group">
              <label>Entrez votre mot de passe</label>
              <input value={this.state.passwordOne} onChange={this.handleChange} type="password" name="passwordOne" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="form-group">
              <label>Veuillez confirmer votre mot de passe</label>
              <input value={this.state.passwordTwo} onChange={this.handleChange} type="password" name="passwordTwo" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="form-group">
              <label>Nom d'utilisateur</label>
              <input value={this.state.userName} onChange={this.handleChange} type="text" name="userName" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="form-group">
              <label>Prénom</label>
              <input value={this.state.firstName} onChange={this.handleChange} type="text" name="firstName" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="form-group">
              <label>Nom</label>
              <input value={this.state.lastName} onChange={this.handleChange} type="text" name="lastName" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="form-group">
              <label>Niveau d'études</label>
              <input value={this.state.scholarship} onChange={this.handleChange} type="text" name="scholarship" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="form-group">
              <label>Domaine d'activité</label>
              <input value={this.state.domaine} onChange={this.handleChange} type="text" name="domaine" className="form-control" id="exampleInputPassword1" />
            </div>
            <div className="form-group">
              <label>Ville de résidence</label>
              <input value={this.state.ville} onChange={this.handleChange} type="text" name="ville" className="form-control" id="exampleInputPassword1" />
            </div>
            <div style={{display:'flex', alignItems:'center',justifyContent:'center', marginBottom:'20px'}}>
              <button disabled={isInvalid} onClick={this.signup} style={{marginLeft: '0'}} className="btn btn-success">S'inscrire</button>
              <button style={{marginLeft:'15px'}} type="submit" onClick={this.loginFacebook} className="btn btn-primary">Se connecter avec Facebook</button>
              <span>{this.state.error}</span>
          </div>
        </div>
      </form>
    </div>
    );
  }
}
export default withRouter(SignUp);
