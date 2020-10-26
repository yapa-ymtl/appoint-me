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
      description:"No description.",
      phoneNumber:null,
      workingDays:{Sunday:false,Monday:true,Tuesday:true,Wednesday:true,Thursday:true,Friday:true,Saturday:false},
      startTime:null,
      finishTime:null,
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
            description:snapshot.val().description,
            phoneNumber:snapshot.val().phoneNumber,
            workingDays:snapshot.val().workingDays,
            finishTime:snapshot.val().finishTime,
            startTime:snapshot.val().startTime,
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

  handleSubmitClient=(e)=>{
    
    e.preventDefault();
    if(this.state.imageFile)
    {
      if (!this.state.imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        alert("Please Select valid input file!!!");
        window.location.reload();
      }
      else
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

  handleSubmitBusiness=(e)=>{
    e.preventDefault();

    if(this.state.imageFile)
    {
      if (!this.state.imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        alert("Please Select valid input file!!!");
        window.location.reload();
      }
      else
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
                  description:this.state.description,
                  phoneNumber:this.state.phoneNumber,
                  workingDays:this.state.workingDays,
                  startTime:this.state.startTime,
                  finishTime:this.state.finishTime,

                });
              }
              else
              {
                var userId = firebase.auth().currentUser.uid;
                firebase.database().ref('Users/'+userId).update({
                  imageURL:this.state.image,
                  description:this.state.description,
                  workingDays:this.state.workingDays,
                  phoneNumber:this.state.phoneNumber,
                  startTime:this.state.startTime,
                  finishTime:this.state.finishTime,
                });
              }
              window.location.reload();
          });
        });
        
      }
    }
    else{
      if(this.state.userName!="")
      {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('Users/'+userId).update({
          description:this.state.description,
          username:this.state.userName,
          imageURL:this.state.image,
          workingDays:this.state.workingDays,
          phoneNumber:this.state.phoneNumber,
          startTime:this.state.startTime,
          finishTime:this.state.finishTime,
        });
        window.location.reload();
      }
    }

  }

  removeClientPhoto=()=>{
    this.setState({
      image:"https://firebasestorage.googleapis.com/v0/b/appointme-17cfe.appspot.com/o/profilePic%2Fman.png?alt=media&token=d0f73041-271c-4031-94fa-f023395d6670",
    })
  }

  removeBusinessPhoto=()=>{
    this.setState({
      image:"https://firebasestorage.googleapis.com/v0/b/appointme-17cfe.appspot.com/o/profilePic%2Fgroup%20dp.png?alt=media&token=52b8eef0-465a-46c5-b2ce-a2b4367bac24",
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

  handelCheckBox=(e)=>{
    if(e.target.id=='Sunday')
    {
      this.setState(prevState => ({
        workingDays: {                   
            ...prevState.workingDays,
            Sunday:!this.state.workingDays.Sunday
        }
    }))
    }
    console.log(e.target.id)
    if(e.target.id=='Monday')
    {
      this.setState(prevState => ({
        workingDays: {                   
            ...prevState.workingDays,
            Monday:!this.state.workingDays.Monday
        }
    }))
    }

    if(e.target.id=='Tuesday')
    {
      this.setState(prevState => ({
        workingDays: {                   
            ...prevState.workingDays,
            Tuesday:!this.state.workingDays.Tuesday
        }
    }))
    }

    if(e.target.id=='Wednesday')
    {
      this.setState(prevState => ({
        workingDays: {                   
            ...prevState.workingDays,
            Wednesday:!this.state.workingDays.Wednesday
        }
    }))
    }

    if(e.target.id=='Thursday')
    {
      this.setState(prevState => ({
        workingDays: {                   
            ...prevState.workingDays,
            Thursday:!this.state.workingDays.Thursday
        }
    }))
    }

    if(e.target.id=='Friday')
    {
      this.setState(prevState => ({
        workingDays: {                   
            ...prevState.workingDays,
            Friday:!this.state.workingDays.Friday
        }
    }))
    }

    if(e.target.id=='Saturday')
    {
      this.setState(prevState => ({
        workingDays: {                   
            ...prevState.workingDays,
            Saturday:!this.state.workingDays.Saturday
        }
    }))
    }
  }

  render() {
    if(this.state.loading===true)
    {
      return(
        <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'}}>
          <Spinner type="grow" color="primary" size="lg" />
        </div>
      )
    }

    if(this.props.authenticated)
    {
      return (
        this.state.type!=='client'?
        <div>
          <Container style={{margin:10}}  fluid="xl">
            <h2><p>{this.state.userName} <Badge color="secondary" pill> {this.state.businessType}</Badge></p></h2>
            <form onSubmit={this.handleSubmitBusiness}>
              <Row>
                <Col  sm="5" xs="12">
                  <Image src={this.state.image} alt="profile pic" style={{height:200,width:200}} roundedCircle/><br/>
                  <a style={{fontSize:12,color:"blue"}} onClick={this.removeBusinessPhoto}>Remove photo</a>
                  <Input type="file" name="file" id="imageFile"  onChange={this.handleImageChange} />
                  <FormText color="muted">
                    In here some items you can not edit , Only your profile picture and user name can be changed.
                  </FormText>
                </Col>
                <Col xs="12" sm="7">
                  <MDBInput 
                    type="textarea" 
                    label="Description about your service" 
                    rows="5" id="description"
                    value={this.state.description}
                    onChange={this.handleChange}/>
                </Col>
              </Row>
              <Row>
                <Col xs="8" sm="4">
                  <MDBInput 
                    label="User name"
                    validate error="wrong" success="right"
                    type="text" id="userName" className="form-control" 
                    value={this.state.userName}  onChange={this.handleChange} 
                  />
                </Col>
                <Col xs="9" sm="5">
                <MDBInput
                  placeholder="Phone number"
                  defaultCountry="US" label="Phone number"
                  value={this.state.phoneNumber} id="phoneNumber"
                  onChange={this.handleChange}/>
                </Col>
              </Row>
              <Row>
              <div style={{margin:10}}>Select working days<br/>
                <div class="custom-control custom-checkbox custom-control-inline" >
                  <input type="checkbox" class="custom-control-input" checked={this.state.workingDays.Sunday} id="Sunday" onClick={this.handelCheckBox}/>
                  <label class="custom-control-label" for="Sunday">Sunday</label>
                </div>

                <div class="custom-control custom-checkbox custom-control-inline">
                  <input type="checkbox" class="custom-control-input" id="Monday" checked={this.state.workingDays.Monday}  id="Monday " onClick={this.handelCheckBox}/>
                  <label class="custom-control-label" for="Monday">Monday</label>
                </div>

                <div class="custom-control custom-checkbox custom-control-inline">
                  <input type="checkbox" class="custom-control-input" id="Tuesday" checked={this.state.workingDays.Tuesday}  id="Tuesday" onClick={this.handelCheckBox}/>
                  <label class="custom-control-label" for="Tuesday">Tuesday</label>
                </div>

                <div class="custom-control custom-checkbox custom-control-inline">
                  <input type="checkbox" class="custom-control-input" id="Wednesday" checked={this.state.workingDays.Wednesday}  id="Wednesday" onClick={this.handelCheckBox}/>
                  <label class="custom-control-label" for="Wednesday">Wednesday</label>
                </div>

                <div class="custom-control custom-checkbox custom-control-inline">
                  <input type="checkbox" class="custom-control-input" id="Thursday" checked={this.state.workingDays.Thursday}  id="Thursday" onClick={this.handelCheckBox}/>
                  <label class="custom-control-label" for="Thursday">Thursday</label>
                </div>

                <div class="custom-control custom-checkbox custom-control-inline">
                  <input type="checkbox" class="custom-control-input" id="Friday" checked={this.state.workingDays.Friday}  id="Friday" onClick={this.handelCheckBox}/>
                  <label class="custom-control-label" for="Friday">Friday</label>
                </div>

                <div class="custom-control custom-checkbox custom-control-inline">
                  <input type="checkbox" class="custom-control-input" id="Saturday" checked={this.state.workingDays.Saturday}  id="Saturday" onClick={this.handelCheckBox}/>
                  <label class="custom-control-label" for="Saturday">Saturday</label>
                </div>
              </div>
              </Row>
              <Row></Row>
              <Row>
                <br/>
                <Col xs="12">
                <Label>Select working Time</Label></Col>
                <Col xs="5" sm="4">
                  <Input
                    type="time"
                    id="startTime"
                    value={this.state.startTime}
                    onChange={this.handleChange}
                  />
                </Col>
                <p> To </p>
                <Col xs="5" sm="4">
                  <Input
                    type="time"
                    id="finishTime"
                    value={this.state.finishTime}
                    onChange={this.handleChange}
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
        </div>
        :
        <>
          <Container style={{margin:10}}>
            <Row>
              <h2>{this.state.userName}</h2>
            </Row>
            <form onSubmit={this.handleSubmitClient}>
              <Row>
                <Col  sm="5" xs="12">
                  <Image src={this.state.image} alt="profile pic" style={{height:200,width:200}} roundedCircle/><br/>
                  <a style={{fontSize:12,color:"blue"}} onClick={this.removeClientPhoto}>Remove photo</a>
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
