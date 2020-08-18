import React, { Component } from 'react'
import {Image, Card ,Button} from 'react-bootstrap';
import {MDBBtn} from "mdbreact";

class card extends Component {

    constructor(props)
    {
        super(props);

        this.state={
            serviceList:null,
        }
    }

    render() {
        if(typeof this.props.service !== 'undefined')
       {
            return (
                <div class="container" style={{marginBottom:10}}>
                    <Card >
                        <Card.Header>{this.props.service.username}</Card.Header>
                        <div className="row">
                        <Card.Body>
                            <Card.Title>{this.props.service.type}</Card.Title>
                            <Card.Text>
                            <div className="row" >
                                <div className="col-sm-12 col-md-3"><Image variant="top" src={this.props.service.imageURL} alt="profile photo" style={{height:140,width:140}} thumbnail/></div>
                                <div className="col-sm-12 col-md-9">With supporting text below as a natural lead-in to additional content.</div>
                            </div>
                            </Card.Text>
                            <MDBBtn  style={{color:"white"}} >Make appointment</MDBBtn >
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
