import React, { Component } from 'react'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
import { MDBContainer, MDBRow, MDBCol, MDBBtn ,MDBIcon} from 'mdbreact';
import ReactFormInputValidation from "react-form-input-validation";

class SignupModel extends Component{
    constructor(props) {
        super(props)

        this.state = {
          fields: {
            name: "",
            email: "",
            phone_number: "",
            password:"",
            password_confirmation:"",
          },
          errors: {}
        };  
        
    this.form = new ReactFormInputValidation(this);
    this.form.useRules({
        name: "required",
        email: "required|email",
        phone_number: "required|numeric|digits_between:10,12",
        password:"required|min:6",
        password_confirmation:"required|confirmed"
    });
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
          Sign up to get services
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
        <input className="form-control"
          type="text"
          name="name"
          onBlur={this.form.handleBlurEvent}
          onChange={this.form.handleChangeEvent}
          value={this.state.fields.name}
        />
        <label className="error" style={{color:'red',fontSize:12}}>
          <i>{this.state.errors.name ? this.state.errors.name : ""}</i>
        </label>
        <br />

        <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
          Your email
        </label>
        <input className="form-control"
          type="email"
          name="email"
          onBlur={this.form.handleBlurEvent}
          onChange={this.form.handleChangeEvent}
          value={this.state.fields.email}
        />
        <label className="error" style={{color:'red',fontSize:12}}>
          <i>{this.state.errors.email ? this.state.errors.email : ""}</i>
        </label>        
        <br />

        <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
          Your password
        </label>
        <input className="form-control"
        type="password" 
        name="password"
        onBlur={this.form.handleBlurEvent}
        onChange={this.form.handleChangeEvent}
        value={this.state.fields.password}
        />
        <label className="error" style={{color:'red',fontSize:12}}>
          <i>{this.state.errors.password ? this.state.errors.password : ""}</i>
        </label>
        <br />

        <label htmlFor="defaultFormRegisterPasswordEx" className="grey-text">
          Confirm password
        </label>
        <input className="form-control"
        type="password" 
        name="password_confirmation"
        onBlur={this.form.handleBlurEvent}
        onChange={this.form.handleChangeEvent}
        value={this.state.fields.password_confirmation}
        />
        <label className="error" style={{color:'red',fontSize:12}}>
          <i>{this.state.errors.password_confirmation ? console.log(this.state.password) : ""}</i>
        </label>        
        <br />
        <div className="text-center mt-4">
        <MDBBtn
                  type="button"
                  gradient="blue"
                  rounded
                  className="btn-block z-depth-1a"
                >
                  Sign up
                </MDBBtn>
        </div>
        <div className='footer pt-3 lighten-3'>
              <MDBRow className='d-flex justify-content-center'>
                <p className='font-small mb-2 pt-3 {}'>
                  or Sign up with
                </p>
              </MDBRow>
              <div className="row my-3 d-flex justify-content-center">
                <MDBBtn
                  type="button"
                  color="white"
                  rounded
                  className="mr-md-3 z-depth-1a"
                >
                  <MDBIcon fab icon="facebook-f" className="blue-text text-center" />
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