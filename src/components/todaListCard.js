import React, { Component } from 'react'
import {Card, CardImg, CardTitle, CardText, CardColumns,CardSubtitle, CardBody,Button, Row, Col} from 'reactstrap';
import CancleModal from './appointmentCancleModel'

export default class todayListCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            addCancleModelShow:false,
        }
    }

    recieveChildValue=(e)=>{
        console.log("recieve from child "+e);
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
                    <Card body outline color="info">
                        <CardTitle><b>{this.props.service.title}</b></CardTitle>
                        <CardText>
                            <Row>
                                <Col sm="10" xs="12">
                                    {this.props.service.description}
                                </Col>
                                <Col sm="2" xs="2">
                                <Button size="sm" color="danger"  onClick={()=>this.setState({addCancleModelShow:true,isOpen: false})} >Cancle</Button>
                                <CancleModal show={this.state.addCancleModelShow} onHide={addCancleModelClose} fromChild={this.recieveChildValue}/>
                                </Col>
                            </Row>
                        </CardText>
                    </Card>
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
