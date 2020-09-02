import React, { Component } from 'react'
import {Card, Button, CardImg, CardTitle, CardText, CardColumns,CardSubtitle, CardBody} from 'reactstrap';

export default class appointmentCard extends Component {
    render() {
        if(typeof this.props.service !== 'undefined')
        {
            return (
            
                <div class="container" style={{marginTop:13}}>
                    <Card body outline color="info">
                        <CardTitle>{this.props.service.title}</CardTitle>
                        <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                        
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
