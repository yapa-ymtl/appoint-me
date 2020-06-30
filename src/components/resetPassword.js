import React, { Component } from 'react'
import { MDBCard,MDBCardTitle,MDBCardText, MDBCol, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';


class resetPassword extends Component {
     render() {
        return (
          <div>
             <MDBCol style={{ maxWidth: "22rem" }}>
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle>Reset your password here</MDBCardTitle>
          <MDBCardText>Some quick example text to build on the card title and make up the bulk of the card's content.</MDBCardText>
          <MDBBtn href="#">Click</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
          </div>
        )
    }
}

export default resetPassword
