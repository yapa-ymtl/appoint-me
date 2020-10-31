import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBRow, MDBCol, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import {Modal} from 'react-bootstrap'
class ModalPage extends Component {

render() {
  return (
    <Modal show={this.props.show} onHide={this.props.onHide} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
            Are you sure you want to delete this appointmet?
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <MDBContainer>
              <MDBRow>
                <MDBCol className="xs-1" middle={true}></MDBCol>
                <MDBCol className="xs-3" middle={true}>
                    <MDBBtn color="danger" onClick={()=>this.props.fromChild(1)}>Yes</MDBBtn>
                </MDBCol>
                <MDBCol className="xs-2" middle={true}></MDBCol>
                <MDBCol className="xs-2" middle={true}></MDBCol>
                <MDBCol className="xs-3" middle={true}>
                    <MDBBtn color="info" onClick={()=>this.props.fromChild(0)}>No</MDBBtn>
                </MDBCol>
                <MDBCol className="xs-1" middle={true}></MDBCol>
              </MDBRow>
            </MDBContainer>
          </Modal.Body>
        </Modal>
    );
  }
}

export default ModalPage;