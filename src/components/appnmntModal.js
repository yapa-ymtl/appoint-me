import React,{Component} from 'react';
import { Container,Row,Col } from 'reactstrap';
import Select from 'react-select';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject,ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';

class Appointment extends Component {
  constructor() {
    super(...arguments);
    var today = new Date(),

    date  = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    this.state = {
      currentDateTime: date,
      appointmentType:null,
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

  handelChange=(e)=>{
    console.log(e.target.val);
  }
  handleSelect=(e)=>{   
    this.setState({appointmentType:e.value});
  }

  render(){
    const businessTypes = [
      {label:'Take a number',value:"Take a number"},
      {label:"Select fixed time",value:"Select fixed time"},
    ];


    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-8" style={{margin:10}} fluid={true}>
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
        {
          this.state.appointmentType=="Select fixed time"?
            (<Container className="themed-container" fluid={true}>
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
            </Container>):
            <div className="container">
              <div className="row">
                <div fluid={true}>
                  Take a new number for your appointment.
                </div>
              </div>
            </div>
          }
      </div>
    );
  }
  
}

export default Appointment;