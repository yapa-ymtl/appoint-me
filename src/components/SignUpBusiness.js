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
                        value={this.state.fields.name}
                      />
                      <label className="error" style={{color:'red',fontSize:12}}>
                        <i>{this.state.errors.name ? this.state.errors.name : ""}</i>
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