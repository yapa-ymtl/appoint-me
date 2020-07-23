import React,{Component} from "react";
import { MDBContainer,MDBAlert , MDBRow, MDBCol, MDBCardBody, MDBInput, MDBBtn, MDBIcon } from 'mdbreact';
import {Modal} from 'react-bootstrap'
import ReactFormInputValidation from "react-form-input-validation";
import {Redirect} from 'react-router-dom'
import { app,facebookProvider, googleProvider, twitterProvider } from '../Config/base'
import firebase from 'firebase'


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
    app.auth().signInWithPopup(facebookProvider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
     /* Pint content of object
           for(var x in user)
      {
        console.log(user[x]+" >>"+x);
      }
       */
      firebase.database().ref('Users/'+user.uid).set({
        username: user.displayName,
        email: user.email,
        imageURL: user.photoURL,
        type:"client",
      });
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(" errocode "+errorCode);
      console.log(" error "+errorMessage);
      if(error) alert("Unable to login with facebook");
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });    
  }

  authWithGoogle(){
    firebase.auth().signInWithPopup(googleProvider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      // ...
      
      firebase.database().ref('Users/'+user.uid).set({
        username: user.displayName,
        email: user.email,
        imageURL: user.photoURL,
        type:"client",
      });
    }).catch(function(error) {
      // Handle Errors here.S
      var errorCode = error.code;
      var errorMessage = error.message;
      if(error) alert(errorMessage);
      console.log("error "+errorMessage);
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  authWithTwitter()
  {
    firebase.auth().signInWithPopup(twitterProvider).then(function(result) {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      var token = result.credential.accessToken;
      var secret = result.credential.secret;
      // The signed-in user info.
      var user = result.user;
      // ...
      firebase.database().ref('Users/'+user.uid).set({
        username: user.displayName,
        email: user.email,
        imageURL: user.photoURL,
      });
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      if(error) alert(errorMessage);
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
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
                      type="email" id="email" className="form-control" onChange={this.handleChange} 
                      />
                      <MDBInput
                      label="Password"
                      type="password" id="password" className="form-control" onChange={this.handleChange}
                      />
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
                        <MDBIcon fab icon="twitter" className="blue-text" onClick={this.authWithTwitter} />
                      </MDBBtn>
                      <MDBBtn
                        type="button"
                        color="white"
                        rounded
                        className="z-depth-1a"
                      >
                        <MDBIcon fab icon="google-plus-g" className="blue-text" onClick={this.authWithGoogle} />
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