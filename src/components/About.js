import React from "react";
import { MDBAnimation } from "mdbreact";


import image1 from '../assets/15913843986872.png'

const AnimationPage = () => {
    return (
      <>
      <div >
        <h1>About us</h1>
        <MDBAnimation type="bounce" infinite style={{display:"flex",justifyContent: "center",alignItems: "center",margin:10,}}>
          <img className="img-fluid" alt="" src={image1} style={{width:"30%",}}/>
        </MDBAnimation>
      </div>
      </>
        
    );
};

export default AnimationPage;



