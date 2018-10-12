import React, {Component} from "react";
import {Link} from 'react-router-dom';
import { Container, Row, Col, Card, Button, Nav, NavItem, NavLink,Popover, PopoverHeader, PopoverBody, Input, CardImg, CardTitle, CardText, CardBody   } from 'reactstrap';
require('bootstrap/dist/css/bootstrap.css');

class Commentaires extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    var ts = new Date(this.props.Commentaires.date);

    return (
      <div style={{display:'flex', flexDirection:'column', justifyContent:'center', margin:'20px'}}>
        <h5 style={{fontSize:'15px', fontWeight: 'normal', textAlign:'left'}}>{this.props.Commentaires.userName}</h5>
        <h5 style={{fontSize:'11px', fontWeight: 'lighter', textAlign:'left'}}>{ts.toLocaleString()}</h5>
        <h5 style={{fontSize:'14px', fontWeight: 'bold', textAlign:'left', }}>{this.props.Commentaires.commentaire}</h5>
        <div style={{borderBottom: "1px solid #D8D8D8", marginTop:'15px', marginBottom:'10px', marginLeft:'auto', marginRight:'auto', width:'75%', opacity:'0.6', display:'flex', justifyContent:'center'}}></div>
      </div>
    )
  }
}

export default Commentaires;

// STYLE CSS //
