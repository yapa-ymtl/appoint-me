import React, { Component } from 'react'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';

class SignupModel extends Component{
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
          Sign up
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
       
<MDBContainer>
  <MDBRow>
    <MDBCol >
      <form>
        <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
          Your name
        </label>
        <input type="text" id="defaultFormRegisterNameEx" className="form-control" />
        <br />
        <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
          Your email
        </label>
        <input type="email" id="defaultFormRegisterEmailEx" className="form-control" />
        <br />
        <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
          Your password
        </label>
        <input type="password" id="defaultFormRegisterPasswordEx" className="form-control" />
        <br />
        <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
          Confirm password
        </label>
        <input type="password" id="defaultFormRegisterPasswordEx" className="form-control" />
        <div className="text-center mt-4">
          <MDBBtn color="unique" type="submit">
            Register
          </MDBBtn>
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

export default SignupModel;