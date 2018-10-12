import React, {Component} from "react";
import {Link} from 'react-router-dom';
import SignButtonSchool from '../Authentication/SignButtonSchool'
import Commentaires from './commentaires'
import firebase from '../../firebase/firebase'
import Media from "react-media";
import { Container, Row, Col, Card, Button, Nav, NavItem, NavLink,Popover, PopoverHeader, PopoverBody, Input, CardImg, CardTitle, CardText, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Alert   } from 'reactstrap'
import Ionicon from 'react-ionicons';
var Rating = require('react-rating');
require('bootstrap/dist/css/bootstrap.css');





// import style from "../stylesheets/styles"

class Schools extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      isInvalid: true,
      commentaire:'',
      commentairesList:[],
      seeMore:'',
      newRating:'',
      numberRating: '',
      rating:'',
      ratingSchool:'',
      ratingRead:'',
      showRating:false,
      isOpenRating: false,
      isOpenCommentaire: false,
      ratingButton: true,
      userID: '',
      userName:'',
      writeAComment: true,
      showComments: false,
      seeMoreText: false,
      seeMoreTextButton:''
    };
    this.openModal = this.openModal.bind(this)
    this.writingCommentaire = this.writingCommentaire.bind(this);
    this.handleChangeCommentaire = this.handleChangeCommentaire.bind(this);
    this.handleChangeRating = this.handleChangeRating.bind(this);
  }

  componentWillMount() {

    const refRatingRead = firebase.database().ref('Schools/'+this.props.schoolId+'/Rating/AverageRating')
    refRatingRead.on('value', snap => {
      this.setState({ratingRead: snap.val()})
    });
  }

  handleRatingChange(value) {
    this.setState({newRating:value, ratingButton: false})
  }

  openModal(){
    var newCommentaire = [];
    const refCommentaires = firebase.database().ref('Schools/'+this.props.schoolId+'/Commentaires')
    refCommentaires.on('value', snap => {
      snap.forEach((childSnapshot) => {
        newCommentaire.push(childSnapshot.val());
      })
      this.setState({commentairesList: newCommentaire});
    });

    var refRatingRead = firebase.database().ref('Schools/'+this.props.schoolId+'/Rating/AverageRating')
    refRatingRead.on('value', snap => {
      this.setState({ratingRead: snap.val()})
    });
    this.setState({
      modalOpen: !this.state.modalOpen
    })
    this.props.returnFetch();
  }

  writingCommentaire(event){
    var newCommentaire = [];
    event.preventDefault();
    firebase.database().ref('Schools/'+this.props.schoolId).child("Commentaires").push(
      {
        commentaire: this.state.commentaire,
        date: firebase.database.ServerValue.TIMESTAMP,
        userName: this.state.userName
      }
    )
    .then(() => {
      const refCommentaires = firebase.database().ref('Schools/'+this.props.schoolId+'/Commentaires')
      refCommentaires.on('value', snap => {
        snap.forEach((childSnapshot) => {
          newCommentaire.push(childSnapshot.val());
        })
        this.setState({commentairesList: newCommentaire, commentaire: '', isOpenCommentaire:true, writeAComment:true, userName:''});
      });
    }).catch((error) => {
      console.log(error);
    }).then(()=>{
      firebase.database().ref('Schools/'+this.props.schoolId).child("Rating").update(
        {
          Rating: Number(this.state.rating)+ Number(this.state.newRating),
          Number_Rating: Number(this.state.numberRating) + 1
        }

      )
      this.setState({rating: Number(this.state.rating)+ Number(this.state.newRating), numberRating: Number(this.state.numberRating)+1, ratingSchool: Number(this.state.rating)/Number(this.state.numberRating)  });


}).then(() => {
        firebase.database().ref('Schools/'+this.props.schoolId).child("Rating").update(
          {
            AverageRating: Number(this.state.ratingSchool)
          }

        )

      }).then(() => {
        this.setState({isOpenRating:true, showRating:false, });
      }).catch((error) => {
        console.log(error);
      });
    }


  handleChangeCommentaire(event) {
    this.setState({commentaire: event.target.value});
  }
  handleChangeUserName(event) {
    this.setState({userName: event.target.value});
  }

  handleChangeRating(event) {
    this.setState({newRating: event.target.value});
  }

  writingAComment(){
    const refRating = firebase.database().ref('Schools/'+this.props.schoolId+'/Rating/Rating')
    refRating.on('value', snap => {
      this.setState({rating: snap.val()})
    });

    var newNombreRating = [];
    const refNombreRating = firebase.database().ref('Schools/'+this.props.schoolId+'/Rating/Number_Rating')
    refNombreRating.on('value', snap => {
      this.setState({numberRating: snap.val()})
    })


    var refRatingRead = firebase.database().ref('Schools/'+this.props.schoolId+'/Rating/AverageRating')
    refRatingRead.on('value', snap => {
      this.setState({ratingRead: snap.val()})
    });

    this.setState({
      writeAComment: false
    })
  }

  seeMoreTextButton(){
    this.setState({
      seeMoreText:!this.state.seeMoreText
    })
  }

  render() {

    const isInvalid =
    this.state.commentaire === '' ||
    this.state.newRating === '' ||
    this.state.userName === ''
    ;

    var showRatingSection;
    if (this.state.writeAComment == true) {
      showRatingSection={
        display: 'none',
      }
    }

    if (this.props.userExist === true){
      this.state.isInvalid = false
      this.state.seeMore = 'Voir plus'
    }else{
      this.state.isInvalid = true,
      this.state.seeMore = "Se connecter pour plus d'informations"
    }

    var commentsList = this.state.commentairesList.map(function(commentaire) {
      return <Commentaires Commentaires={commentaire} user/>;
    })

    if (this.state.seeMoreText === false) {
      this.state.seeMoreTextButton = 'Voir plus'
    }else {
      this.state.seeMoreTextButton = 'Voir moins'

    }

    return (
      <div style={{margin:'auto'}}>
        <div style={cardStyle}>
          <Card>
            <CardImg style={cardImg} top  src="./images/coding1.jpg" alt="Card image cap" />
            <CardBody style={{textAlign:'center'}}>
              <CardTitle style={cardTitle}>🏫 {this.props.school_name}</CardTitle>
              <CardText style={cardCompetence}>🎒{this.props.Competence}</CardText>
              <CardText style={cardVille}>🌎{this.props.city}</CardText>
              <CardText>
                <Rating
                initialRating={this.state.ratingRead}
                emptySymbol={<Ionicon icon="ios-star" color ='black' fontSize="30px"/>}
                fullSymbol={<Ionicon icon="ios-star" color='#FFD700' fontSize="30px"/>}
                readonly
                />
              </CardText>
              <div>
                {this.props.userExist ? ( <Button  style={{backgroundColor:'#353A3F', maxWidth:'285px', fontSize:'15px'}} disabled={this.state.isInvalid} onClick={this.openModal}>Voir plus</Button>) : (<SignButtonSchool/>)}
              </div>
            </CardBody>
          </Card>
        </div>
        <Media query="(max-width: 599px)">
          {matches =>
            matches ? (
              <div>
                <Modal style={modalStyleMobile} isOpen={this.state.modalOpen} toggle={this.toggle} className={this.props.className}>
                  <ModalHeader style={{margin:'auto', display:'row', alignItems:'center', justifyContent: 'center'}} toggle={this.toggle}>
                    <h1 style={{ fontSize:'40px'}}>{this.props.school_name}</h1>
                    <h3 style={{ fontSize:'20px', textAlign:'center'}}>{this.props.city}</h3>
                  </ModalHeader>
                  <CardText style={centerStar}>
                  <Rating
                  initialRating={this.state.ratingRead}
                  emptySymbol={<Ionicon icon="ios-star" color ='black' fontSize="30px"/>}
                  fullSymbol={<Ionicon icon="ios-star" color='#FFD700' fontSize="30px"/>}
                  readonly
                  />
                  </CardText>
                  <ModalBody style={cardText}>
                    <Container>
                    <div style={{width: '90%', marginLeft:'auto', marginRight:'auto', display:'row', justifyContent:'center', textAlign:'center'}}>
                    {this.state.seeMoreText ? ( <CardText style={cardVilleMobile}>{this.props.description}</CardText>
                    ) : (
                      <CardText style={cardVilleMobile}>{this.props.description.substr(0, 200)+'...'}</CardText>
                    ) }
                    <Button color="info" onClick={this.seeMoreTextButton.bind(this)}>{this.state.seeMoreTextButton}</Button>
                        <div style={{border: "0.5px solid #D8D8D8", width: '90%', margin:'auto', opacity:'0.6', marginTop:'50px', marginBottom:'40px'}}></div>
                        </div>
                        <CardText style={cardVille}>
                        <span style={{marginRight:'10px'}}> 🎒 Compétence :</span>
                        {this.props.Competence}</CardText>
                        <CardText style={cardVille}>
                        <span style={{marginRight:'10px'}}>⏱️ Durée de la formation :</span>
                        {this.props.duration}</CardText>
                        <CardText style={cardVille}>
                        <span style={{marginRight:'10px'}}>🏃 Rythme des cours :</span>
                        {this.props.schedule}</CardText>
                        <CardText style={cardVille}>
                        <span style={{marginRight:'10px'}}>🔉 Langue :</span>
                        {this.props.language}</CardText>
                        <CardText style={cardWebsite}>
                        <span style={{marginRight:'10px', textTransform:'capitalize'}}>🌎 Site web :</span>
                        <link>{this.props.website}</link></CardText>
                        <CardText style={cardVille}>
                        <span style={{marginRight:'10px'}}>💰 Prix :</span>
                        {this.props.cost}</CardText>
                        <CardText style={cardVille}>
                        <span style={{marginRight:'10px'}}>🏙️Adresse :</span>
                        {this.props.adress}<br/><div style={{display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'}}><span>{this.props.city}, {this.props.postCode}, {this.props.country}</span></div></CardText>
                        <div style={{border: "0.5px solid #D8D8D8", width: '90%', margin:'auto', opacity:'0.6', marginTop:'50px', marginBottom:'30px'}}></div>

                      <Alert color="info" style={{textTransform:'none'}} isOpen={this.state.isOpenRating}>
                      Merci pour votre commentaire et votre vote !
                      </Alert>
                      <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop: '20px'}}>
                        <div style={showRatingSection}>
                          <Rating
                          initialRating={this.state.newRating} placeholderRating={this.state.AverageRating}
                          placeholderSymbol={<Ionicon icon="ios-star" color='#FFD700' fontSize="30px"/>}
                          fractions={2} step={1} start={0}
                          stop={5} onChange={this.handleRatingChange.bind(this)}
                          emptySymbol={<Ionicon icon="ios-star" color ='black' fontSize="30px"/>}
                          fullSymbol={<Ionicon icon="ios-star" color='#FFD700' fontSize="30px"/>}
                          />
                        </div>
                      </div>
                      <div>
                        {this.state.writeAComment ? (
                          <div style={{width: '90%', margin:'auto', display:'flex', alignItems:'center', justifyContent:'center', flexDirection: 'column'}}>
                            <label htmlFor="message-text" className="col-form-label" style={{margin:'15px', fontSize:'25px'}}>Commentaires</label>
                            <div style={{height:'200px', overflow:'scroll', border: "1px solid #D8D8D8", borderRadius: '5px', padding:'5px', width: '90%', margin:'auto'}}>
                              <ul style={{paddingLeft:'0px'}}>
                              {commentsList.reverse()}
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <div className="form-group" style={{display:'flex', alignItems:'center', justifyContent:'center', margin: 'auto', width:'50%', flexDirection:'column'}}>
                            <label htmlFor="message-text" className="col-form-label" style={{margin:'12px', textTransform:'none'}}>Nom d'utilisateur</label>
                            <textarea style={{height:'35px'}}type="text" value={this.state.userName} onChange={this.handleChangeUserName.bind(this)} className="form-control" id="message-text">
                            </textarea>
                            <label htmlFor="message-text" className="col-form-label" style={{margin:'12px', textTransform:'none'}}>Envoyer un commentaire</label>
                            <textarea type="text" value={this.state.commentaire} onChange={this.handleChangeCommentaire} className="form-control" id="message-text">
                            </textarea>
                          </div>
                        )}
                      </div>
                    </Container>
                 </ModalBody>
                 <ModalFooter>
                  {this.state.writeAComment ? (
                    <Button color="primary" type="submit" onClick={this.writingAComment.bind(this)} className="btn btn-primary">Rédiger un commentaire</Button>
                  ) : (
                    <Button color="primary" type="submit" onClick={this.writingCommentaire} disabled={isInvalid} className="btn btn-primary">Envoyer un commentaire</Button>
                  )
                }
                  <Button color="secondary" onClick={this.openModal}>Retour</Button>
                </ModalFooter>
              </Modal>
              </div>            ) : (
                <div>
                  <Modal style={modalStyle} isOpen={this.state.modalOpen} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader style={{margin:'auto', display:'row', alignItems:'center', justifyContent: 'center'}} toggle={this.toggle}>
                      <h1 style={{ fontSize:'40px'}}>{this.props.school_name}</h1>
                      <h3 style={{ fontSize:'20px', textAlign:'center'}}>{this.props.city}</h3>
                    </ModalHeader>
                    <CardText style={centerStar}>
                    <Rating
                    initialRating={this.state.ratingRead}
                    emptySymbol={<Ionicon icon="ios-star" color ='black' fontSize="30px"/>}
                    fullSymbol={<Ionicon icon="ios-star" color='#FFD700' fontSize="30px"/>}
                    readonly
                    />
                    </CardText>
                    <ModalBody style={cardText}>
                      <Container>
                      <div style={{width: '90%', marginLeft:'auto', marginRight:'auto', display:'row', justifyContent:'center', textAlign:'center'}}>
                      {this.state.seeMoreText ? ( <CardText style={cardVilleMobile}>{this.props.description}</CardText>
                      ) : (
                        <CardText style={cardVilleMobile}>{this.props.description.substr(0, 200)+'...'}</CardText>
                      ) }
                      <Button color="info" onClick={this.seeMoreTextButton.bind(this)}>{this.state.seeMoreTextButton}</Button>
                          <div style={{border: "0.5px solid #D8D8D8", width: '90%', margin:'auto', opacity:'0.6', marginTop:'50px', marginBottom:'40px'}}></div>
                          <CardText style={cardVille}>
                          <span style={{marginRight:'10px'}}>🎒 Compétence :</span>
                          {this.props.Competence}</CardText>
                          <CardText style={cardVille}>
                          <span style={{marginRight:'10px'}}>⏱️ Durée de la formation :</span>
                          {this.props.duration}</CardText>
                          <CardText style={cardVille}>
                          <span style={{marginRight:'10px'}}>🏃 Rythme des cours :</span>
                          {this.props.schedule}</CardText>
                          <CardText style={cardVille}>
                          <span style={{marginRight:'10px'}}>🔉 Langue :</span>
                          {this.props.language}</CardText>
                          <CardText style={cardVille}>
                          <span style={{marginRight:'10px'}}>💰 Prix :</span>
                          {this.props.cost}</CardText>
                          <CardText style={cardWebsite}>
                          <span style={{marginRight:'10px', textTransform:'capitalize'}}>🌎 Site web :</span>
                          <a style={{color:'#353A3F'}} href={this.props.website}>{this.props.website}</a></CardText>
                          <CardText style={cardVille}>
                          <span style={{marginRight:'10px'}}>🏙️Adresse :</span>
                          {this.props.adress}<br/><div style={{display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'}}><span>{this.props.city}, {this.props.postCode}, {this.props.country}</span></div></CardText>
                          <div style={{border: "0.5px solid #D8D8D8", width: '90%', margin:'auto', opacity:'0.6', marginTop:'50px', marginBottom:'30px'}}></div>
                      </div>
                        <Alert color="info" style={{textTransform:'none'}} isOpen={this.state.isOpenRating}>
                        Merci pour votre commentaire et votre vote !
                        </Alert>
                        <div style={{display:'flex', alignItems:'center', justifyContent:'center', marginTop: '20px'}}>
                          <div style={showRatingSection}>
                            <Rating
                            initialRating={this.state.newRating} placeholderRating={this.state.ratingSchool}
                            placeholderSymbol={<Ionicon icon="ios-star" color='#FFD700' fontSize="30px"/>}
                            fractions={2} step={1} start={0}
                            stop={5} onChange={this.handleRatingChange.bind(this)}
                            emptySymbol={<Ionicon icon="ios-star" color ='black' fontSize="30px"/>}
                            fullSymbol={<Ionicon icon="ios-star" color='#FFD700' fontSize="30px"/>}
                            />
                          </div>
                        </div>
                        <div>
                          {this.state.writeAComment ? (
                            <div style={{width: '90%', margin:'auto', display:'flex', alignItems:'center', justifyContent:'center', flexDirection: 'column'}}>
                              <label htmlFor="message-text" className="col-form-label" style={{margin:'15px', fontSize:'25px'}}>Commentaires</label>
                              <div style={{height:'200px', overflow:'scroll', border: "1px solid #D8D8D8", borderRadius: '5px', padding:'5px', width: '90%', margin:'auto'}}>
                                <ul style={{paddingLeft:'0px'}}>
                                {commentsList.reverse()}
                                </ul>
                              </div>
                            </div>
                          ) : (
                            <div className="form-group" style={{display:'flex', alignItems:'center', justifyContent:'center', margin: 'auto', width:'50%', flexDirection:'column'}}>
                              <label htmlFor="message-text" className="col-form-label" style={{margin:'12px', textTransform:'none'}}>Nom dutilisateur</label>
                              <textarea style={{height:'35px'}}type="text" value={this.state.userName} onChange={this.handleChangeUserName.bind(this)} className="form-control" id="message-text">
                              </textarea>
                              <label htmlFor="message-text" className="col-form-label" style={{margin:'12px', textTransform:'none'}}>Envoyer un commentaire</label>
                              <textarea type="text" value={this.state.commentaire} onChange={this.handleChangeCommentaire} className="form-control" id="message-text">
                              </textarea>
                            </div>
                          )}
                        </div>
                      </Container>
                   </ModalBody>
                   <ModalFooter>
                    {this.state.writeAComment ? (
                      <Button color="primary" type="submit" onClick={this.writingAComment.bind(this)} className="btn btn-primary">Rédiger un commentaire</Button>
                    ) : (
                      <Button color="primary" type="submit" onClick={this.writingCommentaire} disabled={isInvalid} className="btn btn-primary">Envoyer un commentaire</Button>
                    )
                  }
                    <Button color="secondary" onClick={this.openModal}>Retour</Button>
                  </ModalFooter>
                </Modal>
                </div>            )
          }
         </Media>
      </div>
    )
  }
}

export default Schools;

// STYLE CSS //

var cardStyle ={
  Width: '300px',
  marginTop: '50px',
  color:'#F29700'
}
var cardTitle ={
  fontSize:'30px',
  color:'#353A3F',
  textTransform: 'capitalize'
}
var cardCompetence ={
  fontSize:'25px',
  color:'#353A3F',
  textTransform: 'capitalize'
}
var cardVille ={
  fontSize:'19px',
  color:'#353A3F',
  textTransform: 'capitalize',
  marginRight:'10px'
}
var cardVilleMobile ={
  fontSize:'17px',
  color:'#353A3F',
  marginRight:'10px'
}
var cardWebsite ={
  fontSize:'19px',
  color:'#353A3F',
  textTransform: 'lowercase'
}
var cardText ={
  color:'#353A3F',
}
var cardImg ={
  width: '318px',
  height: '180px',
}
var modalStyle ={
  maxWidth: '2000px',
  width: '90%',
  height: '100%',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '50px'
}
var modalStyleMobile ={
  maxWidth: '2000px',
  width: '100%',
  height: '100%',
  margin:'auto'
}
var centerStar ={
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '20px'
}
