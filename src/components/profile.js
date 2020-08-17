import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText,Container,Badge ,Spinner, Row, Col } from 'reactstrap';
import {MDBInput,MDBProgress,MDBBtn} from "mdbreact";
import firebase from 'firebase'
import Image from 'react-bootstrap/Image'

class profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email:"",
      type:"",
      userName:"",
      regNo:"",
      businessType:"",
      image:"",
      loading:true,
      imageFile:[],
      progres:null,
    }
  }

  componentWillMount()
  {
    var userId = firebase.auth().currentUser.uid;
    firebase.database().ref('Users/' + userId).once('value').then((snapshot)=> {
      this.setState({
        type:snapshot.val().type,
        userName:snapshot.val().username,
        email:snapshot.val().email,
        image: snapshot.val().imageURL,
        loading:false,
      }) 
      if(this.state.type!=='client')
      {
        this.setState({
          regNo:snapshot.val().RegNo,
          businessType:snapshot.val().businessTypes,
        })
      }
    });
  }

  handleSubmit=(e)=>{
    e.preventDefault();

    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child('profilePic/'+this.state.imageFile.name).put(this.state.imageFile);

    uploadTask.on('state_changed', (snapshot)=>{
      
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //console.log('Upload is ' + progress + '% done');
      this.setState({
          progres:progress,
      })
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
      // Handle unsuccessful uploads
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
      });
    });
   
  }

  handleImageChange=(e)=>{
    this.setState({
      imageFile:e.target.files[0]
    })
  }

  handleChange=(e)=>{
    this.setState({
    [e.target.id]: e.target.value
    })
    
    console.log("image "+ this.state.imageFile);
    
  }

  render() {
    console.log(this.state.progres)
    console.log("image "+ this.state.imageFile.name);
    if(this.state.loading===true)
    {
      return(
        <div style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)'}}>
          <Spinner type="grow" color="primary" style={{height:50,width:50,}} />
        </div>
      )
    }
    return (
      this.state.type!=='client'?
      <div>
        <h2>{this.state.userName}<Badge  color="info"> {this.state.businessType}</Badge></h2>
      </div>:
      <>
        <Container style={{margin:10}}>
          <Row>
            <h2>{this.state.userName}</h2>
          </Row>
          <form onSubmit={this.handleSubmit}>
            <Row>
              <Col  sm="5" xs="12">
                <Image src={this.state.image} alt="profile pic" style={{height:200}} roundedCircle/>
                <Label for="exampleFile" style={{fontSize:12}}>Change photo</Label>
                <Input type="file" name="file" id="imageFile"  onChange={this.handleImageChange} />
                <FormText color="muted">
                  This is some placeholder block-level help text for the above input.
                  It's a bit lighter and easily wraps to a new line.
                </FormText>
              </Col>
              <Col xs="12" sm="6">
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in."</p>
              </Col>
            </Row>
            <Row>
              <Col xs="8" lg="5">
              <MDBInput 
                label="Your email" value={this.state.email} disabled
              />
              </Col>
              <Col xs="8" lg="5">
              <MDBInput 
                label="User name"
                validate error="wrong" success="right"
                type="text" id="userName" className="form-control" value={this.state.userName}  onChange={this.handleChange} 
              />
              </Col>
            </Row> 
            <Row>
            <MDBBtn style={{color:"white"}}  type="submit">Save changes</MDBBtn >
            </Row> 
          </form>  
          <MDBProgress material value={this.state.progres} height="20px"> {this.state.progres}%</MDBProgress>
        </Container>
      </>
    )
  }
}

export default profile
