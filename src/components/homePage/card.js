import React, { Component } from 'react'
import {Image, Card ,Button} from 'react-bootstrap';

class card extends Component {

    constructor(props)
    {
        super(props);

        this.state={
            serviceList:null,
        }
    }

    componentDidMount()
    {
        console.log("***********");
    }

    render() {
        return (
            <div class="container">
                <Card >
        <Card.Header>{this.props.service.username}</Card.Header>
                    <div className="row">
                    <Card.Body>
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Text>
                        <div className="row" >
                            <div className="col-sm-12 col-md-3"><Image variant="top" src="https://memandsahheb.com/wp-content/uploads/2019/12/cute-girls-images-2.jpeg" alt="profile photo" style={{height:160}} thumbnail/></div>
                            <div className="col-sm-12 col-md-9">With supporting text below as a natural lead-in to additional content.</div>
                        </div>
                        </Card.Text>
                        <Button variant="primary">Make appointment</Button>
                    </Card.Body>
                    </div>
                </Card>
            </div>
        )
    }
}

export default card
