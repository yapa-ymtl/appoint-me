import React,{Component} from "react";
import { MDBContainer,MDBAlert , MDBRow, MDBCol, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import {Modal} from 'react-bootstrap'
import ReactFormInputValidation from "react-form-input-validation";
import {Redirect} from 'react-router-dom'
import { app,facebookProvider } from '../Config/base'
import firebase from 'firebase'

import { withRouter } from 'react-router-dom';


class loginModel extends Component{
  constructor(props) {
    super(props)

    this.state = {
      fields: {
        email: "",
        password:"",
      },
      errors: {},

      redirect:false,
    };  
    
this.form = new ReactFormInputValidation(this);
this.form.useRules({
    email: "required|email",
    password:"required",
});
this.authWithFacebook=this.authWithFacebook.bind(this)

}
authWithFacebook(){
    app.auth().signInWithPopup(facebookProvider).then((result,error)=>{
      if(error){
        return(
          <MDBAlert color="danger" >
        Unable to login with Facebook
      </MDBAlert>
        )
      }
      else{
        this.setState({redirect:true})
      }
    })
}

handleSubmit=(e)=>{

    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
    alert('Wrong password.');
    } else {
    alert(errorMessage);
    }
    console.log(error);
    });
}

handleChange=(e)=>{
this.setState({
[e.target.id]: e.target.value
})
}

/* clickHandler=()=>
{
  this.props.closeLoginForForgetpswd()
  this.setState({addForgetPasswordShow:true})
} */

  render() {

    if(this.state.redirect===true){
      return <Redirect to ='/'/>
    }
    return (
      <div>
        <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter" centered >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Login
        </Modal.Title>
      </Modal.Header>

<Modal.Body>
<MDBContainer>
  <MDBRow>
    <MDBCol >
      <MDBCardBody className="sm-10">
        <form onSubmit={this.handleSubmit}>
          <MDBInput 
          label="Your email"
          validate error="wrong" success="right"
          type="email" id="email" className="form-control" onChange={this.handleChange} />
          
          <MDBInput
          label="Password"
          type="password" id="password" className="form-control" onChange={this.handleChange}/>
          <div className="text-center mb-4">
            <MDBBtn gradient="blue" rounded className="btn-block z-depth-1a" type="submit" >Login</MDBBtn>
          </div>
        </form>
        <a onClick={this.props.closeLoginForForgetpswd}>Forget password? </a>
        <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">
                or Sign in with:
              </p>
              <div className="row my-3 d-flex justify-content-center">
                <MDBBtn
                  type="button"
                  color="white"
                  rounded
                  className="mr-md-3 z-depth-1a"
                >
                  <MDBIcon fab icon="facebook-f" className="blue-text text-center" onClick={this.authWithFacebook}/>
                </MDBBtn>
                <MDBBtn
                  type="button"
                  color="white"
                  rounded
                  className="mr-md-3 z-depth-1a"
                >
                  <MDBIcon fab icon="twitter" className="blue-text" />
                </MDBBtn>
                <MDBBtn
                  type="button"
                  color="white"
                  rounded
                  className="z-depth-1a"
                >
                  <MDBIcon fab icon="google-plus-g" className="blue-text" />
                </MDBBtn>
              </div>
      </MDBCardBody>
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