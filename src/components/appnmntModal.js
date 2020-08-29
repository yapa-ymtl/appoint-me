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
      startTime:"09:00",
      date:new Date(),
      minDate:new Date().toISOString(),
      maxDate: new Date(new Date().getFullYear(), new Date().getMonth()+3, new Date().getDate()),
      formattedValue:null,
      title:null,
      description:'',
      businessId:this.props.match.params.id,
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


  handleChange=(e)=>{
    this.setState({
      [e.target.id]:e.target.value
    })
  }

  handleSelect=(e)=>{   
    this.setState({appointmentType:e.value});
  }

  handleSubmit=(e)=>{
    var dateDirect=this.state.date.getFullYear()+'/'+(this.state.date.getMonth()+1)+'/'+this.state.date.getDate();
    
    var userId = firebase.auth().currentUser.uid;
    var newKey = firebase.database().ref('Appointments/'+userId+'/'+dateDirect).push({
      date:this.state.date,
      title:this.state.title,
      description:this.state.description,
      number:'5',
      time:'9:00',
      businessId:this.state.businessId
    }).key; 

    firebase.database().ref('Appointments/'+this.state.businessId+'/'+dateDirect+'/'+newKey).set({
      date:this.state.date,
      title:this.state.title,
      description:this.state.description,
      number:'5',
      time:'9:00',
      userId:userId,
    }); 
  }

  render(){
    const businessTypes = [
      {label:'Take a number',value:"Take a number"},
      {label:"Select fixed time",value:"Select fixed time"},
    ];

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
                  <div className="col" fluid={true}> Your number is <Badge color="danger" pill> 5</Badge></div>
                </div>
                <form className="needs-validation" onSubmit={this.handleSubmit}>
                  <div className="row" style={{marginTop:10}}>
                    <div className="col-sm-5">
                    <DatePickerComponent
                      id="date" placeholder="Pick your date"
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
  
}

export default Appointment;