import React,{Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'

class loginModel extends Component{
    constructor(props) {
        super(props)
       
    }

    render() {
        return (
            <div>
                  <Modal
      {...this.props}
      
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Login
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <MDBContainer>
  <MDBRow>
    <MDBCol >
      <form>
        <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
          Your email
        </label>
        <input type="email" id="defaultFormLoginEmailEx" className="form-control" />
        <br />
        <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
          Your password
        </label>
        <input type="password" id="defaultFormLoginPasswordEx" className="form-control" />
        <div className="text-center mt-4">
          <MDBBtn color="indigo" type="submit">Login</MDBBtn>
        </div>
      </form>
    </MDBCol>
  </MDBRow>
</MDBContainer>
      </Modal.Body>
    </Modal>
            </div>
        )
    }
    
}

export default loginModel;