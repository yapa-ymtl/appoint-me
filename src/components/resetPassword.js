import React, { Component } from 'react'
import { MDBCard,MDBCardTitle,MDBCardText, MDBCol, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import ReactFormInputValidation from "react-form-input-validation";
import {Redirect} from 'react-router-dom'
import firebase from 'firebase'



class resetPassword extends Component {
  constructor(props) {
    super(props)

    this.state = {
      
      password:"",
      password_confirmation:"",
      redirect:false,
    };

  }

  handleChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  handleSubmit=(e) =>{
    e.preventDefault();

    firebase.auth().confirmPasswordReset("",this.state.password)
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/expired-action-code') {
        alert('Code is expired');
    } else {
      alert(errorMessage);
    }
    console.log(error);
  });

    this.setState({
      redirect:true
    })
  }
     render() {
        if(this.state.redirect===true)
          {
            return<Redirect to="/"/>
          }
        return (
          <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin:10,
        }}
      >
      <MDBCol style={{ maxWidth: "22rem" }}>
      <MDBCard style={{alignItems:"center"}}>
        <MDBCardBody>
          <MDBCardTitle>Reset your password here</MDBCardTitle>
          <form onSubmit={this.handleSubmit}>
          <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
          New password
        </label>
        <input className="form-control"
        type="password" 
        name="password"/* 
        onBlur={this.form.handleBlurEvent}
        value={this.state.password} */
        onChange={this.handleChange}
        />
        <label className="error" style={{color:'red',fontSize:12}}>
          <i>{this.state.password.length <6 && this.state.password.length>0 ? "The password must be at least 6 characters." : ""}</i>
        </label>
        <br />

        <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
          Confirm password
        </label>
        <input className="form-control"
        type="password" 
        name="password_confirmation"/* 
        onBlur={this.form.handleBlurEvent}
        value={this.state.password_confirmation} */
        onChange={this.handleChange}
        />
        <label className="error" style={{color:'red',fontSize:12}}>
          <i>{this.state.password!==this.state.password_confirmation && this.state.password_confirmation.length>0 ?"Passwords not match":""}</i>
        </label>        
        <br />
        <div className="text-center mt-4">
        <MDBBtn
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a"
                  type="submit"
                >
                  Set new password
                </MDBBtn>
        </div>
      </form>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
          </div>
        )
    }
}

export default resetPassword
