import React,{Component} from 'react';
import { Container,Row,Col,Badge,Input,FormGroup, FormText } from 'reactstrap';
import Select from 'react-select';
import {MDBInput,MDBBtn} from "mdbreact";
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject,ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
import firebase from 'firebase'

import image from '../assets/calendar.png'


class Appointment extends Component {
  constructor() {
    super(...arguments);
    
    var today = new Date(),
    date  = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    
    this.state = {
      currentDateTime: date,
      appointmentType:null,
      startTime:null,
      date:today,
      minDate:new Date().toISOString(),
      maxDate: new Date(new Date().getFullYear(), new Date().getMonth()+3, new Date().getDate()),
      formattedValue:null,
      title:null,
      description:'',
      crntState:'to be',
      businessId:this.props.match.params.id, 
      workingDays:{Sunday:true,Monday:true,Tuesday:true,Wednesday:true,Thursday:true,Friday:true,Saturday:false},
      number:null,
    }

    this.data = [{
      Id: 1,
      Subject: 'Meeting',
      StartTime: new Date(2020, 7, 26, 10, 0),
      EndTime: new Date(2020, 7, 26, 12, 30),  
      IsAllDay: false,
      Status: 'Completed',
      Priority: 'High'
  }];
  };

  componentWillMount(){
    firebase.database().ref('Users/' + this.state.businessId).once('value').then((snapshot)=> {
      this.setState({
        workingDays:snapshot.val().workingDays,
        startTime:snapshot.val().startTime,
      })
    });

    var dateDirect=this.state.date.getFullYear()+'/'+(this.state.date.getMonth()+1)+'/'+this.state.date.getDate();
    
    firebase.database().ref('Appointments/'+this.state.businessId+'/'+dateDirect+'/variables').once('value').then((snapshot)=> {
      var num=(snapshot.val().count)+1;
      this.setState({
        number:num,
      })
    });
    

  }

  dateChanged=(newDate)=>{
    var dateDirect=newDate.getFullYear()+'/'+(newDate.getMonth()+1)+'/'+newDate.getDate();
    
    firebase.database().ref('Appointments/'+this.state.businessId+'/'+dateDirect+'/variables').once('value').then((snapshot)=> {
      var num=(snapshot.val().count)+1;
      this.setState({
        number:num,
      })
    }).catch((error)=>
    {
      this.setState({
        number:1,
      })
    });
  }

  handleChange=(e)=>{
    this.setState({
      [e.target.id]:e.target.value
    })
    if(e.target.id==="date")
    {
      this.dateChanged(e.target.value);
    }
  }

  handleSelect=(e)=>{   
    this.setState({appointmentType:e.value});
  }

  handleSubmit=(e)=>{
    var dateDirect=this.state.date.getFullYear()+'/'+(this.state.date.getMonth()+1)+'/'+this.state.date.getDate();
    
    var userId = firebase.auth().currentUser.uid;
    var newKey = firebase.database().ref('Appointments/'+userId+'/'+dateDirect).push({
      appointmentDate:this.state.date.toISOString(),
      title:this.state.title,
      description:this.state.description,
      number:this.state.number,
      time:'9:00',
      businessId:this.state.businessId,
      crntState:this.state.crntState,
    }).key; 

    firebase.database().ref('Appointments/'+this.state.businessId+'/'+dateDirect+'/'+newKey).set({
      appointmentDate:this.state.date.toISOString(),
      title:this.state.title,
      description:this.state.description,
      number:this.state.number,
      time:'9:00',
      userId:userId,      
      crntState:this.state.crntState,
    }); 

    
    firebase.database().ref('Appointments/'+this.state.businessId+'/'+dateDirect+'/variables').update({
      count:this.state.number,
    });
  }

  
  disable=(args)=> { 
    if ((args.date.getDay() == 0 && !this.state.workingDays.Sunday) || 
        (args.date.getDay() == 1 && !this.state.workingDays.Monday) ||
        (args.date.getDay() == 2 && !this.state.workingDays.Tuesday) ||
        (args.date.getDay() == 3 && !this.state.workingDays.Wednesday) ||
        (args.date.getDay() == 4 && !this.state.workingDays.Thursday) ||
        (args.date.getDay() == 5 && !this.state.workingDays.Friday) ||
        (args.date.getDay() == 6 && !this.state.workingDays.Saturday) ) 
    { 
      args.element.classList.add("e-disabled"); 
    } 
  } 

  render(){

    const businessTypes = [
      {label:'Take a number',value:"Take a number"},
      {label:"Select fixed time",value:"Select fixed time"},
    ];

    if(this.props.authenticated)
    {
      return (
        <div>
          {
            this.state.appointmentType=="Select fixed time"?
              (
                <Container className="themed-container" fluid={true}>
                  <Row>
                    <Col sm="12" md={{ size: 10, offset: 1 }}>
                  <ScheduleComponent onChange={this.handelChange}  eventSettings={{ dataSource: this.data,
                    fields: {
                        id: 'Id', 
                        subject: { name: 'Subject' },
                        isAllDay: { name: 'IsAllDay' },
                        startTime: { name: 'StartTime' },
                        endTime: { name: 'EndTime' }
                    }
                    }}>
                  <ViewsDirective>
                      <ViewDirective option="Day" startHour='09:00' endHour='17:00'/>
                      <ViewDirective option='Week' startHour='09:00' endHour='17:00'/>
                      <ViewDirective option='Month' showWeekend={false}/>
                      <ViewDirective option="Agenda"/>
                    </ViewsDirective>
                    <Inject services={[Day, Week,Month, Agenda]}/>
                  </ScheduleComponent>
                  </Col>
                  </Row>
                  
                </Container>
              )
            :
            (
              this.state.appointmentType=="Take a number"?
              (
                <div className="container">
                  <div className="row">
                    <div className="col" fluid={true}> Your number is <Badge color="danger" pill> {this.state.number}</Badge></div>

                  </div>
                  <form  onSubmit={this.handleSubmit}>
                    <div className="row" style={{marginTop:10}}>
                      <div className="col-sm-5">
                      <DatePickerComponent
                        id="date" placeholder="Pick your date"
                        showRoundedCorner={true} showWeekend={true}
                        renderDayCell={this.disable} 
                        min={this.state.minDate} max={this.state.maxDate}
                        value={this.state.date} onChange={this.handleChange}
                      />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-6  col-md-5">
                        <MDBInput  
                          label="Title"
                          validate error="wrong" success="right"
                          type="text" id="title" className="form-control" 
                          value={this.state.title}  onChange={this.handleChange} required />
                      </div>
                      <div className="col-sm-8 col-md-7">
                        <MDBInput 
                          type="textarea"  
                          label="Description about your service(optional)" 
                          rows="5" id="description"
                          value={this.state.description}
                          onChange={this.handleChange}/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-8">
                        Your appointment will start around 
                      </div> 
                      <div className="col-xs-6 col-sm-3">
                        <Input
                        type="time"
                        value={this.state.startTime}
                        disabled
                      />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <MDBBtn outline type="submit" >Submit </MDBBtn>
                      </div>
                    </div>
                  </form>
                </div>
              )
              :
              (
                <div className="container">
                  <div className="row">
                    <div className="col-sm-6 col-md-4" style={{margin:10}} fluid={true}>
                      <image src={image} style={{height:15}}/>
                      <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                        Select appointment type.
                      </label>
                      <Select
                        onChange={this.handleSelect}
                        options={ businessTypes }
                        autoFocus={true} />
                    </div>
                  </div>
                </div>
              )
            )
          }
        </div>
      );
    }
    else{
      return(
        <div>
          Please login first!!!....
        </div>
      )
    }
  }
  
}

export default Appointment;