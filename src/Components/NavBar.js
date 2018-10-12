import React, {Component} from "react";
import Logout from './Authentication/Logout'
import SignButton from './Authentication/SignButton'
import {Link} from 'react-router-dom';
import firebase,{config, provider} from '../firebase/firebase';
import Media from "react-media";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  require('bootstrap/dist/css/bootstrap.css');


  class NavBar extends Component {
    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false,
        admin: '',
        isLogged:''

      };
    }
    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    componentDidMount(){
      var isLogged = localStorage.getItem('user');
      this.setState({
        isLogged : isLogged
      })
    }

    componentWillMount() {
      var newAdmin = [];
      const ref = firebase.database().ref('Admin')
      ref.on('value', snap => {
        snap.forEach((childSnapshot) => {
          newAdmin.push(childSnapshot.val());
        })
        this.setState({admin: newAdmin});
      });
    }
    render() {

      var userAdmin;
      if (this.props.userExist == true) {
        userAdmin = this.props.uidProps
      }

      return (
        <div style={navBar}>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Schooléa</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/">Accueil</NavLink>
                </NavItem>
                {userAdmin == this.state.admin  ? (<NavItem>
                  <NavLink href="/add_school">Ajouter une formation</NavLink>
                </NavItem>) : (null) }
                <NavItem>
                {this.props.user ? ( <Logout/>) : (<SignButton />) }
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <Media query="(max-width: 599px)">
           {matches =>
             matches ? (
                <div style={{height:'27px', width:'100%', backgroundColor:'#6e7984', display:'flex', alignItems: 'center', justifyContent:'center'}}>
                  <div style={{margin:'auto'}}>
                     <span style={{color:'#FFF', margin:'7px', fontSize:'10.5px'}}><span style={{fontSize:'14px'}}>😍</span>1000+ Utilisateurs</span>
                     <span style={{color:'#FFF', margin:'7px', fontSize:'10.5px'}}><span style={{fontSize:'14px'}}>🏫</span>200+ Formations</span>
                     <span style={{color:'#FFF', fontSize:'10.5px', margin:'7px'}}><span style={{fontSize:'14px'}}>⭐</span>75%+ Satisfaction</span>
                  </div>
               </div>

             ) : (
               <div style={{height:'32px', width:'100%', backgroundColor:'#6e7984', display:'flex', alignItems: 'center', justifyContent:'center'}}>
                 <div style={{margin:'auto'}}>
                   <span style={{color:'#FFF', margin:'20px', fontSize:'17px'}}><span style={{fontSize:'19px'}}>😍</span>1000+ Utilisateurs</span>
                   <span style={{color:'#FFF', margin:'20px', fontSize:'17px'}}><span style={{fontSize:'19px'}}>🏫</span>200+ Formations</span>
                   <span style={{color:'#FFF', margin:'20px', fontSize:'17px'}}><span style={{fontSize:'19px'}}>⭐</span>75%+ Satisfaction</span>
                 </div>
               </div>
           )
             }
          </Media>
        </div>
        );
      }
    }

    export default NavBar;

    // STYLE CSS //
    var navBar = {
      position: 'absolute',
      top:'0px',
      width:'100%',
      zIndex:'1000',
      margin: '0px',
      overflow: 'hidden'
    }
