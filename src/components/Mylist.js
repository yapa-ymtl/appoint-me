import React, { Component } from 'react'
import firebase from 'firebase'
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import {Container, Row, Col } from 'reactstrap';


import ClientCard from './ClientAppointmentCard'
import  BusinessCard from './BusinessAppointmentCard'

class todayList extends Component {
    constructor()
    {
        super();

        this.state={
            serviceList:[],
            keyList:null,
            businessId:null,
            userType:null,
            loading:true,
            noAppointment:true,
            noBusiness:false,
            crntState:null,
            date:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        }
    }

    componentWillMount()
    {
        if(this.props.authenticated){
            var today=this.state.date;
            var userId = firebase.auth().currentUser.uid;
            var ref = firebase.database().ref('Appointments/'+userId+'/'+this.state.date.getFullYear()+'/'+(this.state.date.getMonth()+1)+'/'+this.state.date.getDate())
            var data_array=[];
            ref.on("value",(data)=>{
                var data_list= data.val();
                if(data_list)
                {
                    var keys=Object.keys(data_list);
                    for(var i=0;i<keys.length;i++)
                    { 
                        data_array[i]=data_list[keys[i]];
                        data_array[i].key=keys[i];
                    } 
                    this.setState({
                        serviceList:data_array,
                        loading:false,
                        noAppointment:false,
                    })   
                }
                else{
                    this.setState({
                        noAppointment:true,
                    })
                }
            })
        }
    }

    handleChange=(e)=>{
        this.setState({
          [e.target.id]:e.target.value
        })
        this.componentWillMount();
    }


    render() {
        console.log("*******"+this.props.authenticated);
        var list;
        if(this.props.authenticated==="client")
        {
            list=this.state.serviceList.map(service=><ClientCard service={service} date={this.state.date}/>);
        }
        else if(this.props.authenticated==="business")
        {
            list=this.state.serviceList.map(service=><BusinessCard service={service} date={this.state.date}/>);
        }
        
        return (
            <>
                <Container>
                    <Row>
                        <Col sm="4" xs="8">
                            <DatePickerComponent
                            id="date" placeholder="Pick your date"
                            showRoundedCorner={true} showWeekend={true}
                            max={this.state.maxDate}
                            value={this.state.date} onChange={this.handleChange}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col sm="11" xs="12">
                        {
                            (this.state.noAppointment)?(<div>No Appointments on this day </div>):(<div>{list}</div>)
                        }
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default todayList

