import React, { Component } from 'react'
import {Image, Card } from 'react-bootstrap';
import {MDBBtn,MDBIcon,MDBLink} from "mdbreact";
import { Router,Link } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';

class card extends Component {

    constructor(props)
    {
        super(props);

        this.state={
            serviceList:null,
        }
    }

    copyEmail=()=>{
        const copy = require('clipboard-copy')
        copy(this.props.service.email)
    }

    copyPhone=()=>{
        const copy = require('clipboard-copy')
        copy(this.props.service.phoneNumber)
    }
    

    render() {
        if(typeof this.props.service !== 'undefined')
       {
           const newTo={
               pathname:"/appointment/"+this.props.service.key,
           };
            return (
                <div class="container" style={{marginTop:13}}>
                    <Card>
                        <Card.Header>{this.props.service.username}</Card.Header>
                        <div>{this.props.returnId}</div>
                        <div className="row">
                        <Card.Body>
                            <Card.Title>{this.props.service.type}</Card.Title>
                            <Card.Text>
                            <div className="row" >
                                <div className="col-sm-12 col-md-3"><Image variant="top" src={this.props.service.imageURL} alt="profile photo" style={{height:140,width:140}} thumbnail/></div>
                                <div className="col-sm-12 col-md-8">{this.props.service.description}</div>
                            </div>
                            <div>
                                Open {this.props.service.startTime} to {this.props.service.finishTime}
                            </div>
                            </Card.Text>
                            <div className="row" >
                                <div>
                                    <Link to={newTo}>
                                        <MDBBtn rounded style={{color:"white"}} >Make appointment</MDBBtn >
                                    </Link>
                                </div>
                                <div id="showTooltip" className="col-sm-6 col-md-3" onClick={this.copyPhone}><MDBIcon icon="phone-alt" /> {this.props.service.phoneNumber}</div>
                                <div id="showTooltip" className="col-sm-6 col-md-5" onClick={this.copyEmail}><MDBIcon icon="envelope" /> {this.props.service.email}</div>
                                <UncontrolledTooltip placement="top" target="showTooltip">
                                    Click to copy
                                </UncontrolledTooltip>
                            </div>
                        </Card.Body>
                        </div>
                    </Card>
                </div>
            )
       }
       else
       {
           return<></>
       }
    
    }
}

export default card
