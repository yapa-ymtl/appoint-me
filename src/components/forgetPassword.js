import React, { Component } from 'react';
import {Modal} from 'react-bootstrap'
import { MDBContainer,MDBInput, MDBCardBody, MDBRow, MDBCol, MDBBtn ,MDBIcon} from 'mdbreact';
import firebase from 'firebase'


class forgetPassword extends Component {
  constructor(props)
  {
    super(props)
    this.state={
        fields:{
            email:"",
        }
    }
  }

  handleChange=(e)=>{
      this.setState({
          email:e.target.value
      })
  }

  handleSubmit=()=>{
    var actionCodeSettings = {
        // The URL to redirect to for sign-in completion. This is also the deep
        // link for mobile redirects. The domain (www.example.com) for this URL
        // must be whitelisted in the Firebase Console.
        url: 'http://localhost:3000',
      
        // This must be true.
        handleCodeInApp: true
      };
    firebase.auth().sendPasswordResetEmail(this.state.email, actionCodeSettings)
        .then(function() {
        alert('Check your email..')
        console.log('sucess')
        })
        .catch(function(error) {
          console.log(error.message)
          console.log('error')
      });   
  }

  render() {

    return (
      <>
      <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter" centered >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Forget Password
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <MDBContainer>
            <MDBRow>
              <MDBCol >
                <MDBCardBody className="sm-10">
                    Enter your e-mail address and we will send you a link to reset your password.
                </MDBCardBody>
                <form>
                  <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                  Your email
                  </label>
                  <input className="form-control"
                  type="email"
                  name="email"
                  /* onBlur={this.form.handleBlurEvent}
                  value={this.state.email}*/
                  onChange={this.handleChange} 
                  />
                  <div className="text-center mt-4">
                    <MDBBtn
                      gradient="blue"
                      rounded
                      className="btn-block z-depth-1a"
                      onClick={this.handleSubmit}>
                      Next
                    </MDBBtn>
                  </div>
                </form>        
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </Modal.Body>
      </Modal>
    </>
    );
  }
}

export default forgetPassword;