import React, { Component } from 'react';
import * as routes from '../../routes'
import { Link, Route, withRouter } from 'react-router-dom';
import firebase from '../../firebase/firebase';
import  {provider} from '../../firebase/firebase';
import { Container, Row, Col, Card, Button, Nav, NavItem, NavLink,Popover, PopoverHeader, PopoverBody, Input, CardImg, CardTitle, CardText, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Alert, Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem} from 'reactstrap';

  class SchoolForm extends Component {
    constructor(props) {
      super(props);
      this.writing = this.writing.bind(this);
      this.handleChangeCity = this.handleChangeCity.bind(this);
      this.handleChangeCountry = this.handleChangeCountry.bind(this);
      this.handleChangePostCode = this.handleChangePostCode.bind(this);
      this.handleChangeSearchPlaces = this.handleChangeSearchPlaces.bind(this);
      this.handleChangeSchoolName = this.handleChangeSchoolName.bind(this);
      this.handleChangeCompetence = this.handleChangeCompetence.bind(this);
      this.handleChangeAdress = this.handleChangeAdress.bind(this);
      this.handleChangeCost = this.handleChangeCost.bind(this);
      this.handleChangeDescription = this.handleChangeDescription.bind(this);
      this.handleChangeDuration = this.handleChangeDuration.bind(this);
      this.handleChangeSchedule = this.handleChangeSchedule.bind(this);
      this.handleChangeLanguage = this.handleChangeLanguage.bind(this);
      this.handleChangeWebsite = this.handleChangeWebsite.bind(this);
      this.toggleAlert = this.toggleAlert.bind(this);
      this.state={
        competence:'',
        city:'',
        school_name:'',
        cost:'',
        adress:'',
        postCode:'',
        searchPlaces: '',
        country:'',
        description:'',
        website:'',
        duration:'',
        schedule:'',
        language:'',
        admin: '',
        userID:'',
        isOpenAlert: false,
        isOpen: false
       }
      };

      componentDidMount(){
        var userID = localStorage.getItem('user');
        this.setState({
          userID : userID
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
      writing(event){
        event.preventDefault();
        const refSchoolId= firebase.database().ref('Schools/').push();
        const keyID= refSchoolId.key;
        refSchoolId.set(
          {
            School_name: this.state.school_name,
            City: this.state.city,
            Competence: this.state.competence,
            Adress: this.state.adress,
            PostCode: this.state.postCode,
            Country: this.state.country,
            Search_Places: this.state.searchPlaces,
            Cost: this.state.cost,
            Description: this.state.description,
            Website: this.state.website,
            Duration: this.state.duration,
            Language: this.state.language,
            Schedule: this.state.schedule,
            Id: keyID,
            Rating:{
              Rating: '1',
              Number_Rating: '1',
              AverageRating: '1'
            },
            Date: firebase.database.ServerValue.TIMESTAMP
          }
        ).then(() => {
          this.setState({competence:'', city:'', school_name:'', cost:'',
          adress:'', description:'', website:'', duration:'', schedule:'', language:'', country:'', postCode:'', searchPlaces:'', isOpenAlert:true});
        }).catch((error) => {
          console.log(error);
        });
      };

      handleChangeSchoolName(event) {
        this.setState({school_name: event.target.value});
      }
      handleChangeCity(event) {
        this.setState({city: event.target.value});
      }
      handleChangePostCode(event) {
        this.setState({postCode: event.target.value});
      }
      handleChangeSearchPlaces(event) {
        this.setState({searchPlaces: event.target.value});
      }
      handleChangeCountry(event) {
        this.setState({country: event.target.value});
      }
      handleChangeCompetence(event) {
        this.setState({competence: event.target.value});
      }
      handleChangeAdress(event) {
        this.setState({adress: event.target.value});
      }
      handleChangeCost(event) {
        this.setState({cost: event.target.value});
      }
      handleChangeDescription(event) {
        this.setState({description: event.target.value});
      }
      handleChangeDuration(event) {
        this.setState({duration: event.target.value});
      }
      handleChangeSchedule(event) {
        this.setState({schedule: event.target.value});
      }
      handleChangeLanguage(event) {
        this.setState({language: event.target.value});
      }
      handleChangeWebsite(event) {
        this.setState({website: event.target.value});
      }
      toggleAlert() {
        this.setState({
          isOpenAlert: !this.state.isOpenAlert
        });
      }

      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      render() {

        const isInvalid =
        this.state.admin == this.state.userID;

        return (
          <div style={{marginBottom:'50px'}}>
          <div style={navBar}>
            <Navbar color="dark" dark expand="md">
              <NavbarBrand href="/">Schooléa</NavbarBrand>
              <NavbarToggler onClick={this.toggle.bind(this)} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="/">Accueil</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
            <Container>
              <Row>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center',justifyContent:'center', margin:'auto'}} className="col-10">
                  <div style={{marginTop:'100px'}} className="col-md-6">
                    <h2 style={{color:'#353A3F', marginBottom:'50px'}}>Ajouter une nouvelle formation</h2>
                    <Alert color="info" isOpen={this.state.isOpenAlert}>
                    Formation ajoutée avec succès !
                    </Alert>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Nom de la formation</label>
                        <textarea type="text" value={this.state.school_name} onChange={this.handleChangeSchoolName}class="form-control" id="message-text">
                        </textarea>
                        <label for="message-text" class="col-form-label">Domaine de compétence</label>
                        <textarea type="text" value={this.state.competence} onChange={this.handleChangeCompetence}class="form-control" id="message-text">
                        </textarea>
                        <label for="message-text" class="col-form-label">Description de la formation</label>
                        <textarea type="text" value={this.state.description} onChange={this.handleChangeDescription}class="form-control" id="message-text">
                        </textarea>
                        <label for="message-text" class="col-form-label">Ville de la formation</label>
                        <textarea type="text" value={this.state.city} onChange={this.handleChangeCity}class="form-control" id="message-text">
                        </textarea>
                        <label for="message-text" class="col-form-label">Adresse</label>
                        <textarea type="text" value={this.state.adress} onChange={this.handleChangeAdress}class="form-control" id="message-text">
                        </textarea>
                        <label for="message-text" class="col-form-label">Code postal</label>
                        <textarea type="text" value={this.state.postCode} onChange={this.handleChangePostCode}class="form-control" id="message-text">
                        </textarea>
                        <label for="message-text" class="col-form-label">Pays</label>
                        <textarea type="text" value={this.state.country} onChange={this.handleChangeCountry}class="form-control" id="message-text">
                        </textarea>
                        <label for="message-text" class="col-form-label">Lieu d'aide à la recherche</label>
                        <textarea type="text" value={this.state.searchPlaces} onChange={this.handleChangeSearchPlaces}class="form-control" id="message-text">
                        </textarea>
                        <label for="message-text" class="col-form-label">Durée de la formation</label>
                        <textarea type="text" value={this.state.duration} onChange={this.handleChangeDuration}class="form-control" id="message-text">
                        </textarea>
                        <label for="message-text" class="col-form-label">Rythme de la formation</label>
                        <textarea type="text" value={this.state.schedule} onChange={this.handleChangeSchedule}class="form-control" id="message-text">
                        </textarea>
                        <label for="message-text" class="col-form-label">Langue de la formation</label>
                        <textarea type="text" value={this.state.language} onChange={this.handleChangeLanguage}class="form-control" id="message-text">
                        </textarea>

                        <label for="message-text" class="col-form-label">Site web</label>
                        <textarea type="text" value={this.state.website} onChange={this.handleChangeWebsite}class="form-control" id="message-text">
                        </textarea>
                        <label for="message-text" class="col-form-label">Prix</label>
                        <textarea type="text" value={this.state.cost} onChange={this.handleChangeCost}class="form-control" id="message-text">
                        </textarea>
                    </div>
                <Button disabled={!isInvalid} color="primary" type="submit" onClick={this.writing} className="btn btn-primary">Envoyer</Button>
                </div>
               </div>
              </Row>
            </Container>
          </div>
        );
      }
    }
    export default withRouter(SchoolForm);

    var navBar = {
      position: 'absolute',
      top:'0px',
      width:'100%',
      zIndex:'1000'
    }
