import React, { Component } from 'react';
import {MDBBtn,MDBIcon} from "mdbreact";
import Offers from './offers'
import Slide from './homePage/slides'
import Card from './homePage/card'
import firebase, { database } from 'firebase'
import Profile from './profile'




class Home extends Component {

    constructor()
    {
        super();

        this.state={
            serviceList:[],
            keyList:null,
        }   
    }

    componentWillMount()
    {
        var ref = firebase.database().ref('Users/');
        var data_array=[];
        ref.on("value", (data)=> {
            var data_list= data.val();
            var keys=Object.keys(data_list);

            var j=0;
            for(var i=0;i<keys.length;i++)
            {
                if(data_list[keys[i]].type!="client")
                { 
                    data_array[j]=data_list[keys[i]];
                   j++;                   
                }
            }  
            this.setState({
                serviceList:data_array,
            })  
        }, function (error) {
        console.log("Error: " + error.code);
        });
    }

    
    render() {
        const services=this.state.serviceList.map(service=><Card service={service}/>);
        

       /*  for(var x in services)
        {
            console.log("X>>"+x+" "+ services[x].email);
        } */
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
                    <MDBBtn rounded size="lg"  className="btn "gradient="aqua"><MDBIcon icon="plus" className="ml-2" />   Make an appointment</MDBBtn>
                </div>
            </div>
        </div>
        <div style={{margin:15}}>
            <Slide/>
        </div>   
        <div> { services} </div>
        <Card/>
        </>
        )
    }
}

export default Home
