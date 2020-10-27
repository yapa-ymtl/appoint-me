import React, { Component } from 'react'
import {Card, CardImg, CardTitle, CardText, CardColumns,CardSubtitle, CardBody} from 'reactstrap';
import { MDBBtn } from "mdbreact";

export default class pastlistsCard extends Component {
    render() {
        if(typeof this.props.service !== 'undefined')
        {
            return (
                <div class="container" style={{marginTop:13}}>
                    <Card body outline color="info">
                        <CardTitle><b>{this.props.service.title}</b></CardTitle>
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
