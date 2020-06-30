import React, { Component } from 'react';
import {MDBBtn,MDBIcon} from "mdbreact";

import image2 from '../assets/15913846114412.png'
/* import Background from '../assets/queue.jpg' */


class Home extends Component {
    
    render() {
        let styleParagraph={
            color:'#17202A',
            fontSize:20,
        }
        return (
            <div>
            <div className="card card-image"  >
                <div className="jumbotron text-white text-center rgba-stylish-strong py-5 px-4" >
                <div class="py-5"style={{backgroundColor:'rgba(253,237,236,0.5)'} }>
                    <h2 className="card-title h2 my-4 py-2" style={{color:'#34495E'}}>Why are you wasting time in a queue?</h2>
                    <p className="mb-4 pb-2 px-md-5 mx-md-5" style={styleParagraph}>Make an appointment easily from the world best appointment website. It will make your job easier</p>
                    <MDBBtn rounded size="lg"  className="btn "gradient="aqua"><MDBIcon icon="plus" className="ml-2" />   Make an appointment</MDBBtn>
                </div>
                </div>
            </div>   
        <h1>Home</h1>
        </div>
        )
    }
}

export default Home
