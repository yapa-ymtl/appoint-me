import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle,MDBBtn, MDBDropdownMenu, MDBDropdownItem, MDBIcon } from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';

import SignupModel from './signupModel'
import LoginModel from './loginModal'

import image1 from '../assets/15913843986872.png'
import image2 from '../assets/15913846114412.png'
import image3 from '../assets/queue.jpg'

var imageStyle={ backgroundImage:`url(${image3})`};

class NavbarPage extends Component {
constructor(props) {
  super(props)

  this.state = {
     addSignupModalShow:false,
     addLoginModalShow:false,
  }
}


state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

render() {
  let addSignupModalClose=()=>this.setState({addSignupModalShow:false});
  let addLoginModalClose=()=>this.setState({addLoginModalShow:false});
  return (
    <>
    <Router>
      <MDBNavbar color="default-color" className={{color:'#075E54'}} dark expand="sm">
        <MDBNavbarBrand href="/" className="m--2"><img src={image2} alt="AppointMe logo" height="40"></img>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="#!">Features</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="#!">Pricing</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <div className="d-none d-md-inline">Dropdown</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href="#!">Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Another Action</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem onClick={()=>this.setState({addLoginModalShow:true})}>Login</MDBDropdownItem>
                  <LoginModel  show={this.state.addLoginModalShow} onHide={addLoginModalClose}/>
                  <MDBDropdownItem onClick={()=>this.setState({addSignupModalShow:true})}>Signup as Client</MDBDropdownItem>
                  <SignupModel show={this.state.addSignupModalShow} onHide={addSignupModalClose}/>
                  <MDBDropdownItem href="#!">Signup as bussiness</MDBDropdownItem>
                  <MDBDropdownItem></MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </Router>
      <div className="card card-image" style={imageStyle} >
        <div className="text-white text-center rgba-stylish-strong py-5 px-4">
          <div class="py-5">
            <h1 className="h1 aqua-text" style={{fontSize:50},{color:'#00FFFF'}}> AppointMe</h1>
            <h2 className="card-title h2 my-4 py-2">Why are you wasting time in a queue?</h2>
            <p className="mb-4 pb-2 px-md-5 mx-md-5">Make an appointment easily from the world best appointment website. It will make your job easier</p>
            <MDBBtn rounded size="lg"  className="btn "gradient="aqua"><MDBIcon icon="plus" className="ml-2" />   Make an appointment</MDBBtn>
          </div>
        </div>
      </div>
</>
    );
  }
}

export default NavbarPage;