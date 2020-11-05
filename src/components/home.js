import React, { Component } from 'react';
import {MDBBtn,MDBIcon} from "mdbreact";
import {Spinner} from 'reactstrap'
import firebase, { database } from 'firebase'
import Select from 'react-select';

import BusinessCard from './homePage/appointmentCard'
import Card from './homePage/card'


class Home extends Component {

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
            business_type:null,
        }   
    }

    componentWillMount()
    {
        if(this.props.authenticated==="business"){
            var today=new Date();
            var userId = firebase.auth().currentUser.uid;
            var ref = firebase.database().ref('Appointments/'+userId+'/'+today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate())
            var data_array=[];
            ref.on("value",(data)=>{
                var data_list= data.val();
                if(data_list)
                {
                    var keys=Object.keys(data_list);

                    var j=0;
                    for(var i=0;i<keys.length;i++)
                    { 
                        if(data_list[keys[i]].crntState==="to be")
                        {
                            data_array[j]=data_list[keys[i]];
                            data_array[j].key=keys[i];
                            j++;
                        }
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
        else
        {
            var ref = firebase.database().ref('Users/');
            var data_array=[];
            ref.on("value", (data)=> {
                var data_list= data.val();
                if(data_list)
                {
                    var keys=Object.keys(data_list);

                    var j=0;
                    for(var i=0;i<keys.length;i++)
                    { 
                        if(data_list[keys[i]].type!="client")
                        { 
                            data_array[j]=data_list[keys[i]];
                            data_array[j].key=keys[i];
                        j++;                   
                        }
                    }  
                    this.setState({
                        serviceList:data_array,
                        loading:false,
                    })  
                }
                else
                {
                    this.setState({
                        noBusiness:true,
                    })
                }
            }, function (error) {
            console.log("Error: " + error.code);
            });
        }
    }

    handleSelect=(e)=>{   

        var ref = firebase.database().ref('Users/');
        var data_array=[];
        ref.on("value", (data)=> {
            var data_list= data.val();
            if(data_list)
            {
                var keys=Object.keys(data_list);
                var j=0;
                for(var i=0;i<keys.length;i++)
                { 
                    if(e.value===null)
                    {
                        if(data_list[keys[i]].type!="client")
                        { 
                            data_array[j]=data_list[keys[i]];
                            data_array[j].key=keys[i];
                        j++;                   
                    }
                    }
                    else if(data_list[keys[i]].businessTypes===e.value)
                    { 
                        data_array[j]=data_list[keys[i]];
                        data_array[j].key=keys[i];
                    j++;                   
                    }
                }  
                this.setState({
                    serviceList:data_array,
                    loading:false,
                })  
            }
            else
            {
                this.setState({
                    noBusiness:true,
                })
            }
        }, function (error) {
        console.log("Error: " + error.code);
        });
    }

    
    render() {

        const services=this.state.serviceList.map(service=><Card service={service}/>);
        const apponointments=this.state.serviceList.map(service=><BusinessCard service={service}/>);
       
        const businessTypes = [
            {label:"None",value:null},
            {label:"Medical Center",value:"Medical Center"},
            {label:"Saloon",value:"Saloon"},
            {label:"Shop",value:"Shop"},
            {label:"Other",value:"Other"},
          ];

        let styleParagraph={
            color:'black',
            fontSize:20,
        }

        return (
            <>
            <div className="card card-image"  >
                <div className="jumbotron text-white text-center rgba-stylish-strong py-5 px-4" >
                    <div class="py-5"style={{backgroundColor:'rgba(253,237,236,0.7)',borderRadius:10} }>
                        <h2 className="card-title h2 my-4 py-2" style={{color:'black'}}>Why are you wasting time in a queue?</h2>
                        <p className="mb-4 pb-2 px-md-5 mx-md-5" style={styleParagraph}>Make an appointment easily from the world best appointment website. It will make your job easier</p>
                        {/* <MDBBtn rounded size="lg"  className="btn "gradient="aqua"><MDBIcon icon="plus" className="ml-2" onclick={this.makeAppointment} />   Make an appointment</MDBBtn> */}
                    </div>
                </div>
            </div> 

            <BusinessCard/>
            {
                this.props.authenticated==="business"?
                (
                    <>
                    {this.state.noAppointment?<div >No appointments today </div>:<div>{apponointments}</div>}
                    </>  
                ):
                (
                    <>
                    <div className="row">
                        <div className="col-md-3 col-sm-2"></div>
                        <div className="col-md-6 col-sm-8">
                            <label htmlFor="defaultFormRegisterNameEx" className="grey-text">
                                Business type
                            </label>
                            <Select
                                onChange={this.handleSelect}
                                options={ businessTypes }
                                autoFocus={true} 
                            />
                        </div>
                        <div className="col-md-3 col-sm-2"></div>
                    </div>
                        {
                            this.state.noBusiness?<div>No registered businesses</div>:<div>{services}</div>
                        }
                        </>
                )
            }
            
            </>
        );
        
    }
}

export default Home
