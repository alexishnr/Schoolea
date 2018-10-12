import React, {Component} from 'react';
import { Container, Row, Col, Card, Button, Nav, NavItem, NavLink,Popover, PopoverHeader, PopoverBody, Input, Alert  } from 'reactstrap';
import {Link} from 'react-router-dom';
import { HashLink} from 'react-router-hash-link';
import Schools from '../Schools/schools';
import Logout from '../Authentication/Logout';
import Login from '../Authentication/Login';
import SignUp from '../Authentication/SignUp';
import Sign from '../Authentication/Sign';
import SignButton from '../Authentication/SignButton';
import NavBar from '../NavBar';
import * as firebase from 'firebase';
import ReactDOM from 'react-dom'
import {config, provider} from '../../firebase/firebase';
require('bootstrap/dist/css/bootstrap.css');
const auth = firebase.auth();


class Home extends Component {

  constructor() {
    super();
    this.authListener = this.authListener.bind(this);
    this.returnFetch = this.returnFetch.bind(this);
    this.state = {
      loading: true,
      schools: [],
      user: '',
      userExist: false,
      search:'',
      value:'',
      hideSchools: false,
      isOpen:false,
      allSchoolId:''
    }
  }


  handleChange(event) {
    this.setState({search: event.target.value});
  }

  updateSearch(event){
    this.setState({
      search: event.target.value.toLowerCase().substr(0,20)
    })
  }

  componentDidMount() {
    this.authListener();
  }

  componentWillMount() {
    var newSchools = [];
    const ref = firebase.database().ref('Schools')
    ref.on('value', snap => {
      snap.forEach((childSnapshot) => {
        newSchools.push(childSnapshot.val());
      })
      this.setState({schools: newSchools, loading: false});
    });
  }

  returnFetch() {
    var newSchools = [];
    const ref = firebase.database().ref('Schools')
    ref.on('value', snap => {
      snap.forEach((childSnapshot) => {
        newSchools.push(childSnapshot.val());
      })
      this.setState({schools: newSchools, loading: false});
    });
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        this.setState({ user, userExist: true });
        localStorage.setItem('user', user.uid);
      } else {
        this.setState({ user: null, userExist: false });
        localStorage.removeItem('user');
      }
    });

  }
  hideSchools(){
    console.log('ici:', this.state.schools);
    this.setState({ hideSchools: true });
  }

  render() {

    var isDisplay;
    var sorryDisplay;

    if (this.state.search == '') {
      this.state.hideSchools = false
    }

    if (this.state.hideSchools == false || this.state.search == '') {
      isDisplay = {
        display : "none"
      }
      }

    var uidProps;
    if (this.state.user != null) {
      this.state.userExist = true
    }
    if (this.state.userExist = true && this.state.user != null) {
      uidProps = this.state.user.uid

    }

    const searchList = this.state.schools.filter((schools) =>{
      return schools.City.toLowerCase().indexOf(this.state.search) !== -1 ||
      schools.Competence.toLowerCase().indexOf(this.state.search) !== -1 ||
      schools.Search_Places.toLowerCase().indexOf(this.state.search) !== -1
    }
  )
  var isDisplayReturn;
  if (searchList != '' && this.state.hideSchools == true) {
    isDisplayReturn = {
      display : "none",
      textAlign: 'center'
    }
  }else{
    isDisplayReturn = {
      textAlign: 'center'
    }
  }

  if (searchList != '' && this.state.hideSchools == true) {
    isDisplay={
      marginBottom: '50px'
    }
  }


  return (
    <div School_name>
      <div style={background}>
       <div style={allTopHome}>
         <NavBar user={this.state.user} userExist={this.state.userExist} uidProps={uidProps}/>
          <Container>
            <Row>
              <div style={homeTop} className="col-lg-8 col-xs-10">
                <div style={isDisplay}>
                   <Alert color="danger" style={isDisplayReturn}>
                   Désolé aucune formation n'a été trouvée, veuillez réessayer.
                   </Alert>
                  </div>
                  <h1 style={{textAlign:'center', color:'#fff', fontSize:'45px', margin:'10px'}}> Trouvez la formation de vos rêves.</h1>
                  <div style={{display: 'flex', marginTop:'20px', marginBottom:'20px'}} className="col-12">
                    <Input style={{marginRight:'1px', borderRadiusBottomRight: '0px'}} type="text"
                      placeholder='Entrez une ville ou une spécialité ...'
                      value={this.state.search}
                      onChange={this.updateSearch.bind(this)} />
                  <HashLink to="#school">
                   <Button style={{backgroundColor:'#F29700'}} onClick={this.hideSchools.bind(this)}>Start</Button>
                  </HashLink>
                </div>
              </div>
            </Row>
         </Container>
       </div>
       <div style={{position:'absolute', bottom:'5px', left:'10px', color:'#fff', fontSize:'10px'}}>
       <p>Schooléa. Tous Droits Réservés ©</p>
       </div>
    </div>
      <div style={isDisplay}>
       <Container>
         <Row id="school" style={{margin:'auto'}}>
           {searchList.map((schools)=> {
             return <Schools school_name={schools.School_name} city={schools.City} userExist={this.state.userExist} schoolId={schools.Id} Competence={schools.Competence} returnFetch={this.returnFetch} cost={schools.Cost} adress={schools.Adress} description={schools.Description} website={schools.Website} duration={schools.Duration} language={schools.Language} schedule={schools.Schedule} country={schools.Country} postCode={schools.PostCode}/>
           }
         )
       }
        </Row>
      </Container>
     </div>
    </div>
  )
 }
}
export default Home;
// STYLE CSS //
var background = {
  backgroundImage: 'url(./images/jonas1.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  overflow: 'scroll',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  display:'flex',
  margin: '0px',
  position:'relative',
  top:'0px',
  bottom:'0px',
  left:'0px',
  right:'0px',
}
var titre = {
  color: '#fff',
  zIndex:'1'
}
var inputHome = {
  display: 'flex',
  width: '700px'
}
var searchHome = {
  display: 'flex',
  alignItems: 'auto',
  justifyContent: 'auto'
}
var homeTop = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin:'auto'
}
var allTopHome = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin:'auto'
}
