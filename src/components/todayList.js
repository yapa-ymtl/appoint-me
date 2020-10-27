import React, { Component } from 'react'
import Card from './todaListCard'
import firebase from 'firebase'
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import {Container, Row, Col } from 'reactstrap';

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
            noAppointment:false,
            noBusiness:false,
            crntState:null,
            date:new Date(),
        }
    }

    componentWillMount()
    {
        if(this.props.authenticated){
            var today=this.state.date;
            var userId = firebase.auth().currentUser.uid;
            var ref = firebase.database().ref('Appointments/'+userId+'/'+today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate())
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
        
        const list=this.state.serviceList.map(service=><Card service={service}/>);

        return (
            <div>
                <Container>
                    <Row>
                        <Col sm="6" xs="12">
                            <DatePickerComponent
                            id="date" placeholder="Pick your date"
                            showRoundedCorner={true} showWeekend={true}
                            max={this.state.maxDate}
                            value={this.state.date} onChange={this.handleChange}
                            />
                        </Col>
                    </Row>
                </Container>
                {list}
            </div>
        )
    }
}

export default todayList

