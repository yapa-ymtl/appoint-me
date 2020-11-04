import React, { Component } from 'react'
import {Card, CardImg,Badge, CardTitle, CardText, CardColumns,CardSubtitle, CardBody, Row, Col} from 'reactstrap';
import {MDBBtn,MDBIcon} from "mdbreact";
import CancleModal from './appointmentCancleModel'
import firebase from 'firebase'

export default class BusinessAppointmentCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            addCancleModelShow:false,
        }
    }

    recieveChildValue=(e)=>{
        if(e==1)
        {
            this.props.fromChild(this.props.service.number);
            var dateDirect=this.props.date.getFullYear()+'/'+(this.props.date.getMonth()+1)+'/'+this.props.date.getDate();
            var userId = firebase.auth().currentUser.uid;
            firebase.database().ref('Appointments/'+userId+'/'+dateDirect+'/'+this.props.service.key).update({
                crntState:"cancled",
            });
            
            firebase.database().ref('Appointments/'+this.props.service.userId+'/'+dateDirect+'/'+this.props.service.key).update({
                crntState:"cancled",
            });
        }
        this.setState({
            addCancleModelShow:false
        })

    }

    render() {
        let addCancleModelClose=()=>this.setState({addCancleModelShow:false});
        if(typeof this.props.service !== 'undefined')
        {
            return (
                <div class="container" style={{marginTop:6, marginBottom:6}}>
                    {
                        this.props.service.crntState==="cancled"?
                        (
                            <></>
                        )
                        :
                        (
                            this.props.service.crntState==="done"?
                            (
                                <Card body outline color="success">
                                    <CardTitle><Badge>{this.props.service.number}</Badge><b>{this.props.service.title}</b></CardTitle>
                                    <CardText>
                                        <Row> 
                                            <Col sm="10" xs="12">
                                                {this.props.service.description}
                                            </Col>
                                            <Col sm="2" xs="2">                                        
                                            <MDBBtn size="sm" color="success" disabled={true} >done</MDBBtn>
                                            </Col>
                                        </Row>
                                    </CardText>
                                </Card>
                            )
                            :
                            (
                                <Card body outline color="info">
                                    <CardTitle><Badge size="lg">{this.props.service.number}</Badge><b> {this.props.service.title}</b></CardTitle>
                                    <CardText>
                                        <Row>
                                            <Col sm="8" xs="12">
                                                {this.props.service.description}
                                            </Col>
                                            <Col sm="2" xs="6">                                        
                                                <MDBBtn size="sm" color="success" >Finished</MDBBtn>
                                            </Col>
                                            <Col sm="2" xs="6">                                        
                                            <MDBBtn size="sm" color="danger"  onClick={()=>this.setState({addCancleModelShow:true,isOpen: false})} >Remove</MDBBtn>
                                                <CancleModal show={this.state.addCancleModelShow} onHide={addCancleModelClose} fromChild={this.recieveChildValue}/>
                                            </Col>
                                        </Row>
                                    </CardText>
                                </Card>
                            )

                        )

                    }
                </div>
            )
        }
        else
        {
            return <>
            <h2>No</h2>
            </>
        }
    }
}
