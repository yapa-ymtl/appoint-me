import React, { Component } from "react";
import { MDBNavbar,MDBTooltip, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle,MDBBtn, MDBDropdownMenu, MDBView ,MDBDropdownItem, MDBIcon } from "mdbreact";
import { Router,Link } from 'react-router-dom';
import firebase from 'firebase'

import SignupModel from './signupModel'
import LoginModel from './loginModal'
import SignUpBusiness from './SignUpBusiness'
import ForgetPassword from './forgetPassword'

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
     addForgetPasswordShow:false,
     prevScrollpos: window.pageYOffset,
      visible: true
  }

  this.closeLoginForForgetpswd=this.closeLoginForForgetpswd.bind(this)
}

componentDidMount() {
  window.addEventListener("scroll", this.handleScroll);
}

componentWillUnmount() {
  window.removeEventListener("scroll", this.handleScroll);
}

handleScroll = () => {
  const { prevScrollpos } = this.state;

  const currentScrollPos = window.pageYOffset;
  const visible = prevScrollpos > currentScrollPos;

  this.setState({
    prevScrollpos: currentScrollPos,
    visible
  });
};

closeLoginForForgetpswd(){
  console.log('change to true');
  this.setState({
    addForgetPasswordShow:true,
    addLoginModalShow:false,
    })
}

state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

handleLogout=()=>{
  firebase.auth().signOut( )
  this.setState({
    isOpen: !this.state.isOpen 
  })
}

render() {
  let addSignupModalClose=()=>this.setState({addSignupModalShow:false});
  let addSignupBusinessClose=()=>this.setState({addSignupBusinessShow:false});
  let addLoginModalClose=()=>this.setState({addLoginModalShow:false});
  let addForgetPasswordClose=()=>this.setState({addForgetPasswordShow:false});
  return (
    <div>
      <header>
      <MDBNavbar color="default-color" className={{color:'#075E54'}} dark expand="sm" scrolling fixed="top">
      <MDBTooltip placement="top">
        <MDBNavLink to="/" onClick={()=>{this.setState({ isOpen: false });}}><img src={image2} alt="AppointMe logo" height="30"/> <a style={{color:'white'}} className=".d-none .d-md-block .d-lg-none"> AppointMe</a>
        </MDBNavLink>
        <div>Back to Home</div>
      </MDBTooltip>

        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            {/* <MDBNavItem>
              <MDBNavLink to="/mylist">My List</MDBNavLink>
            </MDBNavItem> */}
            <MDBNavItem>
              <MDBDropdown >
                <MDBDropdownToggle nav caret color="primary">
                  My List
                </MDBDropdownToggle>
                <MDBDropdownMenu basic className="dropdown-default">
                <MDBNavItem><MDBDropdownItem href="#!" >Today List</MDBDropdownItem></MDBNavItem>
                <MDBNavItem><MDBDropdownItem href="#!">Past List</MDBDropdownItem></MDBNavItem>
                <MDBNavItem><MDBDropdownItem href="#!">Future List</MDBDropdownItem></MDBNavItem></MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/about" onClick={()=>{this.setState({ isOpen:false});}}>About</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/rate" onClick={()=>{this.setState({ isOpen:false});}}>Rate us</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  {this.props.authenticated?<MDBIcon icon="user" />:<i class="fas fa-user-slash"></i>}
                </MDBDropdownToggle>
                  {
                    this.props.authenticated ? 
                    ( <MDBDropdownMenu className="dropdown-default">
                      <MDBDropdownItem><i class="far fa-user"></i> Profile</MDBDropdownItem><link></link>
                    <MDBDropdownItem onClick={this.handleLogout}><MDBIcon icon="sign-out-alt"/> Log out</MDBDropdownItem>
                    </MDBDropdownMenu>)
                    :
                    (<MDBDropdownMenu className="dropdown-default">
                    <MDBDropdownItem onClick={()=>this.setState({addLoginModalShow:true,isOpen: false})} to={{ pathname: "/login", state: { modal: true },}}>Login</MDBDropdownItem>
                    <LoginModel  show={this.state.addLoginModalShow} onHide={addLoginModalClose} closeLoginForForgetpswd={this.closeLoginForForgetpswd}/>
                    <ForgetPassword  show={this.state.addForgetPasswordShow} onHide={addForgetPasswordClose}/>
                    <MDBDropdownItem onClick={()=>this.setState({addSignupModalShow:true,isOpen: false })}>Signup Client</MDBDropdownItem>
                    <SignupModel show={this.state.addSignupModalShow} onHide={addSignupModalClose}/>
                    <MDBDropdownItem onClick={()=>this.setState({addSignupBusinessShow:true,isOpen:false })}>Signup bussiness</MDBDropdownItem>
                    <SignUpBusiness show={this.state.addSignupBusinessShow} onHide={addSignupBusinessClose}/>
                    </MDBDropdownMenu>)
                   
                  }
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
      </header>
      </div>
    );
  }
}

export default NavbarPage;