import React, { Component } from 'react'
import {Card, CardImg, CardTitle, CardText, CardColumns,CardSubtitle, CardBody, Row, Col} from 'reactstrap';
import {MDBBtn,MDBIcon} from "mdbreact";
import CancleModal from './appointmentCancleModel'
import firebase from 'firebase'

export default class todayListCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            addCancleModelShow:false,
        }
    }

    recieveChildValue=(e)=>{
        if(e==1)
        {
            var dateDirect=this.props.date.getFullYear()+'/'+(this.props.date.getMonth()+1)+'/'+this.props.date.getDate();
            var userId = firebase.auth().currentUser.uid;
            firebase.database().ref('Appointments/'+userId+'/'+dateDirect+'/'+this.props.service.key).update({
                crntState:"cancled",
            });
            firebase.database().ref('Appointments/'+this.props.service.businessId+'/'+dateDirect+'/'+this.props.service.key).update({
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
                            <Card body outline color="danger">
                                <CardTitle><b>{this.props.service.title}</b></CardTitle>
                                <CardText>
                                    <Row>
                                        <Col sm="10" xs="12">
                                            {this.props.service.description}
                                        </Col>
                                        <Col sm="2" xs="2">                                        
                                        <MDBBtn size="sm" color="danger" disabled={true} >Cancled</MDBBtn>
                                        <CancleModal show={this.state.addCancleModelShow} onHide={addCancleModelClose} fromChild={this.recieveChildValue}/>
                                        </Col>
                                    </Row>
                                </CardText>
                            </Card>
                        )
                        :
                        (
                            this.props.service.crntState==="done"?
                            (
                                <Card body outline color="danger">
                                    <CardTitle><b>{this.props.service.title}</b></CardTitle>
                                    <CardText>
                                        <Row>
                                            <Col sm="10" xs="12">
                                                {this.props.service.description}
                                            </Col>
                                            <Col sm="2" xs="2">                                        
                                            <MDBBtn size="sm" color="danger" disabled={true} >Cancled</MDBBtn>
                                            <CancleModal show={this.state.addCancleModelShow} onHide={addCancleModelClose} fromChild={this.recieveChildValue}/>
                                            </Col>
                                        </Row>
                                    </CardText>
                                </Card>
                            )
                            :
                            (
                                <Card body outline color="info">
                                    <CardTitle><b>{this.props.service.title}</b></CardTitle>
                                    <CardText>
                                        <Row>
                                            <Col sm="10" xs="12">
                                                {this.props.service.description}
                                            </Col>
                                            <Col sm="2" xs="2">
                                            <MDBBtn size="sm" color="danger"  onClick={()=>this.setState({addCancleModelShow:true,isOpen: false})} >Cancle</MDBBtn>
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
