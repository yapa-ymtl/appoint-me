import React, { Component } from 'react'
import Card from './todaListCard'
import firebase from 'firebase'
import {Container, Row, Col } from 'reactstrap';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';

class pastList extends Component {
    constructor()
    {
        super();

        this.state={
            maxDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-1),
            serviceList:[],
            keyList:null,
            businessId:null,
            userType:null,
            loading:true,
            noAppointment:false,
            noBusiness:false,
            crntState:null,
            date:new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        }
    }

    componentWillMount()
    {
        if(this.props.authenticated){
            var today=new Date();
            var userId = firebase.auth().currentUser.uid;
            var ref = firebase.database().ref('Appointments/'+userId+'/'+today.getFullYear()+'/'+(today.getMonth()+1))
            var data_array=[];
            ref.on("value",(data)=>{
                var data_list= data.val();
                if(data_list)
                {
                    var keys=Object.keys(data_list);

                    var j=0;
                    for(var i=0;i<keys.length;i++)
                    { 
                        /*
                        console.log(data_list[keys[i]]);
                        console.log(keys);
                        if(data_list[keys[i]].crntState==="cancled")
                        { 
                            data_array[j]=data_list[keys[i]];
                            data_array[j].key=keys[i];
                        j++;                   
                        } */
                    }  
                    /* this.setState({
                        serviceList:data_array,
                        loading:false,
                    })   */
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
      }


    render() {
        console.log("**************")
        console.log(this.state.date-1);
        const list=this.state.serviceList.map(service=><Card service={service}/>);

        return (
            <>
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
                
            </>
        )
    }
}

export default pastList;

