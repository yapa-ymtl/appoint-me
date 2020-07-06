import React, { Component } from 'react'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'
import { MDBContainer, MDBRow, MDBCol, MDBBtn ,MDBIcon} from 'mdbreact';
import ReactFormInputValidation from "react-form-input-validation";
import firebase from 'firebase'
import Select from 'react-select';


class SignuBusiness extends Component{
    constructor(props) {
        super(props)

        this.state = {
          name: "",
          email: "",
          registration_num: "",
          business_type:"",
          password:"",
          password_confirmation:"",
          errors: {},
          creatUser:true,
        };  
        
    this.form = new ReactFormInputValidation(this);
    this.form.useRules({
        name: "required",
        email: "required|email",
        registration_num: "required|numeric",
        business_type:"required",
        password:"required|min:6",
        password_confirmation:"required|confirmed"
    });
    }    

    handleChange=(e)=>{
      this.setState({
        [e.target.name]:e.target.value
      })
    }

    handleSelect=(e)=>{   
      this.setState({business_type:e.value});
    }
    handleSubmit=(e)=>{
      e.preventDefault();
       firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .catch((error) =>{
      // Handle Errors here.
      
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("error code "+ errorCode);
      console.log("error "+ error)
      if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
          this.setState({
            creatUser:false,
          })
      } else {
        alert(errorMessage);
        this.setState({
          creatUser:false,
        })
      }
           
    })
    .then((data)=>{
      if(this.state.creatUser)
      {
      firebase.database().ref('Users/Businesses/'+data.user.uid).push().set({
        username: this.state.name,
        email: this.state.email,
        RegNo:this.state.registration_num,
        businessTypes:this.state.business_type,
        //Type:this.state.
      }); 
      }
      this.setState({
        creatUser:true,
      })
    })   
    }


    render() {
      const businessTypes = [
        {label:"Medical Center",value:"Medical Center"},
        {label:"Saloon",value:"Saloon"},
        {label:"Shop",value:"Shop"},
        {label:"Other",value:"Other"},
      ];

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
                    <form  onSubmit={this.handleSubmit}>
                  <div class="row">
                    <div class="col-sm-12 col-md-8">
                      <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                        Bussiness name
                      </label>
                      <input className="form-control"
                        type="text"
                        name="name"
                        onBlur={this.form.handleBlurEvent}
                        value={this.state.name}
                        onChange={this.handleChange}
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
                        type="number"
                        name="registration_num"
                        onBlur={this.form.handleBlurEvent}
                        value={this.state.registration_num}
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
                        value={this.state.email}
                      />
                      <label className="error" style={{color:'red',fontSize:12}}>
                        <i>{this.state.errors.email ? this.state.errors.email : ""}</i>
                      </label>        
                      <br />
                    </div>
                    <div className="col-md-5 col-sm-8">
                      <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                        Business type
                      </label>
                      <Select
                      onChange={this.handleSelect}
                      options={ businessTypes }
                      autoFocus={true} />
                      </div>
                      <div class="col-sm-12 col-md-6">
                      <label htmlFor="defaultFormRegisterConfirmEx" className="grey-text">
                        Your password
                      </label>
                      <input className="form-control"
                      type="password" 
                      name="password"
                      onBlur={this.form.handleBlurEvent}
                      value={this.state.password}
                      onChange={this.handleChange}
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
                      onChange={this.handleChange}
                      value={this.state.password_confirmation}
                      />
                      <label className="error" style={{color:'red',fontSize:12}}>
                        <i>{this.state.errors.password_confirmation ? console.log(this.state.password) : ""}</i>
                      </label>        
                      </div>
                      <div className="text-center mt-4">
                      <MDBBtn
                                type="submit"
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