import React, { Component } from 'react'
import { Button, Form, FormGroup,Progress , Label, Input, FormText,Container,Badge ,Spinner, Row, Col } from 'reactstrap';
import {MDBInput,MDBBtn} from "mdbreact";
import { Redirect} from 'react-router-dom';
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
      imageFile:null,
      progres:null,
    };
  }

  componentWillMount()
  {
    if(this.props.authenticated)
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
    else{
      this.setState({
        loading:false,
      })
    }
  }

  handleSubmit=(e)=>{
    
    e.preventDefault();
    if(this.state.imageFile)
    {
      var storageRef = firebase.storage().ref();
      var uploadTask = storageRef.child('profilePic/'+this.state.imageFile.name).put(this.state.imageFile);

      uploadTask.on('state_changed', (snapshot)=>{
        
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
      }, ()=> {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL)=> {
            if(this.state.userName!="")
            {
              var userId = firebase.auth().currentUser.uid;
              firebase.database().ref('Users/'+userId).update({
                imageURL:downloadURL,
                username:this.state.userName,
              });
            }
            else
            {
              var userId = firebase.auth().currentUser.uid;
              firebase.database().ref('Users/'+userId).update({
                imageURL:this.state.image,
              });
            }
            window.location.reload();
        });
      });
      
    }
    else{
      if(this.state.userName!="")
      {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('Users/'+userId).update({
          username:this.state.userName,
          imageURL:this.state.image,
        });
        window.location.reload();
      }
    }
   
  }

  handlePhoto=()=>{
    this.setState({
      image:"https://firebasestorage.googleapis.com/v0/b/appointme-17cfe.appspot.com/o/profilePic%2Fman.png?alt=media&token=d0f73041-271c-4031-94fa-f023395d6670",
    })

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
        
  }

  render() {
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
    if(this.props.authenticated)
    {
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
                  <Image src={this.state.image} alt="profile pic" style={{height:200,width:200}} roundedCircle/><br/>
                  <a style={{fontSize:12,color:"blue"}} onClick={this.handlePhoto}>Remove photo</a>
                  <Input type="file" name="file" id="imageFile"  onChange={this.handleImageChange} />
                  <FormText color="muted">
                    In here some items you can not edit , Only your profile picture and user name can be changed.
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
            {
              this.state.progres>0?(this.state.progres==100?<Progress color="success" value="100">Complet!</Progress>: <Progress value={this.state.progres}>Uploading...{Math.round(this.state.progres)}%</Progress>):<></>
              
            }
          </Container>
        </>
      )
    }
    else{
      return <Redirect to="/" />
    }
  }
}

export default profile
