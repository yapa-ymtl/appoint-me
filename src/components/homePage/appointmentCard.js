import React, { Component } from 'react'
import {Card, CardImg, CardTitle, CardText, CardColumns,Badge,CardSubtitle, CardBody} from 'reactstrap';
import { MDBBtn } from "mdbreact";

export default class appointmentCard extends Component {
    render() {
        if(typeof this.props.service !== 'undefined')
        {
            return (
                <div class="container" style={{marginTop:13}}>
                    <Card body outline color="info">
                        <CardTitle><Badge style={{fontSize:23}}> {this.props.service.number}</Badge><b>{this.props.service.title}</b></CardTitle>
                        <CardText>
                            {this.props.service.description}
                        </CardText>
                    </Card>
                </div>
            )
        }
        else
        {
            return <></>
        }
    }
}
