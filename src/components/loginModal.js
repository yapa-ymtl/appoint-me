import React,{Component} from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBIcon, MDBModalFooter } from 'mdbreact';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
import ReactFormInputValidation from "react-form-input-validation";
import {Redirect} from 'react-router-dom'
import { facebookProvider } from "../Config/base";
import {app} from '../Config/base'


class loginModel extends Component{
  constructor(props) {
    super(props)

    this.state = {
      fields: {
        email: "",
        password:"",
      },
      errors: {},

      redirect:false
    };  
    
this.form = new ReactFormInputValidation(this);
this.form.useRules({
    email: "required|email",
    password:"required",
});

this.handleChange=this.handleChange.bind(this)
this.handleSubmit=this.handleSubmit.bind(this)
this.authWithFacebook=this.authWithFacebook.bind(this)

}
authWithFacebook(){
    app.auth().signInWithPopup(facebookProvider).then((result,error)=>{
      if(error){
        console.log("error with login facebook")
      }
      else{
        this.setState({redirect:true})
      }
    })
}
handleChange=(e)=>{
  this.setState({
    [e.target.id]: e.target.value
  })
}

handleSubmit=(e)=>{
e.preventDefault();
console.log(this.state.password );
}
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