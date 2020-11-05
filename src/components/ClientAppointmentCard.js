import React, { Component } from 'react'
import {Card, CardImg, CardTitle, CardText, CardColumns,CardSubtitle,Badge, CardBody, Row, Col} from 'reactstrap';
import {MDBBtn,MDBIcon} from "mdbreact";
import CancleModal from './appointmentCancleModel'
import firebase from 'firebase'

export default class ClientAppointmentCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            addCancleModelShow:false,
            businessName:null,
        }
    }

    componentWillMount()
    {
        firebase.database().ref('Users/' + this.props.service.businessId).once('value').then((snapshot)=> {
            this.setState({
                businessName:snapshot.val().username,
            })
          });
    }

    recieveChildValue=(e)=>{
        if(e==1)
        {
            this.props.fromChild(this.props.service.number,this.props.service.businessId);
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
                                <CardTitle><b>{this.props.service.title}</b><i style={{fontSize:13}}> at {this.state.businessName}</i></CardTitle>
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
                                <Card body outline color="success">
                                    <CardTitle><b>{this.props.service.title}</b><i style={{fontSize:13}}> at {this.state.businessName}</i></CardTitle>
                                    <CardText>
                                        <Row>
                                            <Col sm="10" xs="12">
                                                {this.props.service.description}
                                            </Col>
                                            <Col sm="2" xs="2">                                        
                                            <MDBBtn size="sm" color="success" disabled={true} >Done</MDBBtn>
                                            <CancleModal show={this.state.addCancleModelShow} onHide={addCancleModelClose} fromChild={this.recieveChildValue}/>
                                            </Col>
                                        </Row>
                                    </CardText>
                                </Card>
                            )
                            :
                            (
                                <Card body outline color="info">
                                    <CardTitle><Badge style={{fontSize:23}}>{this.props.service.number}</Badge><b style={{fontSize:20}}> {this.props.service.title}</b><i style={{fontSize:13}}> at {this.state.businessName}</i></CardTitle>
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
