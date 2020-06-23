import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle,MDBBtn, MDBDropdownMenu, MDBView ,MDBDropdownItem, MDBIcon } from "mdbreact";
import { Link } from 'react-router-dom';

import SignupModel from './signupModel'
import LoginModel from './loginModal'
import SignUpBusiness from './SignUpBusiness'

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
     addSignupBusinessShow:false,
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
  let addSignupBusinessClose=()=>this.setState({addSignupBusinessShow:false});
  let addLoginModalClose=()=>this.setState({addLoginModalShow:false});
  return (
    <>
      <MDBNavbar color="default-color" className={{color:'#075E54'}} dark expand="sm">
        <Link to="/">
        <MDBNavbarBrand href="/" className="m--2"><img src={image2} alt="AppointMe logo" height="40"></img>
        </MDBNavbarBrand>
        </Link>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="/mylist">My List</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret color="primary">
                  <div className="d-none d-md-inline">Dropdown</div>
                </MDBDropdownToggle>
                <MDBDropdownMenu basic className="dropdown-default">
                  <MDBDropdownItem href="#!" >Today List</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Past List</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Future List</MDBDropdownItem></MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/About">About</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown dropleft>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem onClick={()=>this.setState({addLoginModalShow:true})}>Login</MDBDropdownItem>
                  <LoginModel  show={this.state.addLoginModalShow} onHide={addLoginModalClose}/>
                  <MDBDropdownItem onClick={()=>this.setState({addSignupModalShow:true})}>Signup Client</MDBDropdownItem>
                  <SignupModel show={this.state.addSignupModalShow} onHide={addSignupModalClose}/>
                  <MDBDropdownItem onClick={()=>this.setState({addSignupBusinessShow:true})}>Signup bussiness</MDBDropdownItem>
                  <SignUpBusiness show={this.state.addSignupBusinessShow} onHide={addSignupBusinessClose}/>
                  <MDBDropdownItem></MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
</>
    );
  }
}

export default NavbarPage;