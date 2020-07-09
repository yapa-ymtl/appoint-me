/* import React, { Component } from 'react'

class rate extends Component {
  render() {
    return (
      <>
        <h1>Rate us</h1>
        <p>
          ajfjirjoa ajfej daljo fjjjfwo 
        </p>
      </>
    )
  }
}
export default rate; */

import React from 'react';
import { MDBContainer, MDBRating } from 'mdbreact';

const RatingPage = () => {
  return (
    <MDBContainer>
      <MDBRating iconRegular />
    </MDBContainer>
  );
};

export default RatingPage;