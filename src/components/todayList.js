import React, { Component } from 'react'
import Card from './todaListCard'
import firebase from 'firebase'

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
        }
    }

    componentWillMount()
    {
        if(this.props.authenticated){
            var today=new Date();
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


    render() {
        
        const list=this.state.serviceList.map(service=><Card service={service}/>);

        return (
            <div>
                {list}
            </div>
        )
    }
}

export default todayList

