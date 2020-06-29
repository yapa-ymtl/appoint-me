import React, { Component } from 'react'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
import { MDBContainer, MDBRow, MDBCol, MDBBtn ,MDBIcon} from 'mdbreact';
import ReactFormInputValidation from "react-form-input-validation";
import Types from './types'


class SignuBusiness extends Component{
    constructor(props) {
        super(props)

        this.state = {
          fields: {
            name: "",
            email: "",
            registration_num: "",
            password:"",
            password_confirmation:"",
          },
          errors: {}
        };  
        
    this.form = new ReactFormInputValidation(this);
    this.form.useRules({
        name: "required",
        email: "required|email",
        registration_num: "required|numeric",
        password:"required|min:6",
        password_confirmation:"required|confirmed"
    });
    }    

    render() {
        return (
            <div>
            <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter" centered size="lg">
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Sign up to provide services
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div class="container">
                    <form>
                  <div class="row">
                    <div class="col-sm-12 col-md-8">
                      <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                        Bussiness name
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
                    </div>
                    <div class="col-sm-10 col-md-4">
                      <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                        Registration Number
                      </label>
                      <input className="form-control"
                        type="text"
                        name="regNo"
                        onBlur={this.form.handleBlurEvent}
                        onChange={this.form.handleChangeEvent}
                        value={this.state.fields.registration_num}
                      />
                      <label className="error" style={{color:'red',fontSize:12}}>
                        <i>{this.state.errors.registration_num ? this.state.errors.registration_num : ""}</i>
                      </label>
                    </div>
                    <div class="col-sm-12 col-md-7">
                      <label htmlFor="defaultFormRegisterEmailEx" className="grey-text">
                        Bussiness email
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
                    </div>
                      <Types/>
                      <div class="col-sm-12 col-md-6">
                      <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                        Your password
                      </label>
                      <input className="form-control"
                      type="password" 
                      name="password"
                      onBlur={this.form.handleBlurEvent}
                      value={this.state.fields.password}
                      onChange={this.form.handleChangeEvent}
                      />
                      <label className="error" style={{color:'red',fontSize:12}}>
                        <i>{this.state.errors.password ? this.state.errors.password : ""}</i>
                      </label>
                      </div>

                      <div class="col-sm-12 col-md-6">
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
                      </div>
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
                      </div>
                    </form>
                  </div>
              </Modal.Body>
            </Modal>
            </div>
        )
    }
    
}

export default SignuBusiness;