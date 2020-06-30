import React, { Component } from 'react';

class About extends Component {
    render() {
        return (
            <div>
                <h1>About us</h1>
            </div>
        )
    }
}

export default About


/* import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBStepper, MDBStep , MDBBtn, MDBCard, MDBCardBody, MDBInput } from "mdbreact";


class StepperExample extends React.Component {

state = {
  formActivePanel1: 1,
  formActivePanel1Changed: false,
}

swapFormActive = (a) => (param) => (e) => {
  this.setState({
    ['formActivePanel' + a]: param,
    ['formActivePanel' + a + 'Changed']: true
  });
}

handleNextPrevClick = (a) => (param) => (e) => {
  this.setState({
    ['formActivePanel' + a]: param,
    ['formActivePanel' + a + 'Changed']: true
  });
}

handleSubmission = () => {
  alert('Form submitted!');
}

calculateAutofocus = (a) => {
  if (this.state['formActivePanel' + a + 'Changed']) {
    return true
  }
}

render() {
  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol xl="6" lg="7" md="10">
          <MDBCard>
            <MDBCardBody>
              <h2 className="text-center font-weight-bold pt-4 pb-5">
                <strong>Steps form example</strong>
              </h2>
              <MDBStepper form>
                <MDBStep form>
                  <a href="#formstep1" onClick={this.swapFormActive(1)(1)}>
                    <MDBBtn color={ this.state.formActivePanel1===1 ? "indigo" : "default" } circle>
                      1
                    </MDBBtn>
                  </a>
                  <p>MDBStep 1</p>
                </MDBStep>
                <MDBStep form>
                  <a href="#formstep2" onClick={this.swapFormActive(1)(2)}>
                    <MDBBtn color={ this.state.formActivePanel1===2 ? "indigo" : "default" } circle>
                      2
                    </MDBBtn>
                  </a>
                  <p>MDBStep 2</p>
                </MDBStep>
                <MDBStep form>
                  <a href="#formstep3" onClick={this.swapFormActive(1)(3)}>
                    <MDBBtn color={ this.state.formActivePanel1===3 ? "indigo" : "default" } circle>
                      3
                    </MDBBtn>
                  </a>
                  <p>MDBStep 3</p>
                </MDBStep>
              </MDBStepper>

              <form action="" method="post">
                <MDBRow>
                  {this.state.formActivePanel1 === 1 && (
                  <MDBCol md="12">
                    <h3 className="font-weight-bold pl-0 my-4">
                      <strong>MDBStep 1</strong>
                    </h3>
                    <MDBInput label="First Name" className="mt-3" autoFocus={this.calculateAutofocus(1)} />
                    <MDBInput label="Last Name" className="mt-3" />
                    <MDBInput label="Address" type="textarea" rows="2" />
                    <MDBBtn color="indigo" rounded className="float-right" onClick={this.handleNextPrevClick(1)(2)}>
                      next
                    </MDBBtn>
                  </MDBCol>
                  )}
                  {this.state.formActivePanel1 === 2 && (
                  <MDBCol md="12">
                    <h3 className="font-weight-bold pl-0 my-4">
                      <strong>MDBStep 2</strong>
                    </h3>
                    <MDBInput label="Company Name" className="mt-4" autoFocus={this.calculateAutofocus(1)} />
                    <MDBInput label="Company Address" className="mt-4" />
                    <MDBBtn color="indigo" rounded className="float-left" onClick={this.handleNextPrevClick(1)(1)}>
                      previous
                    </MDBBtn>
                    <MDBBtn color="indigo" rounded className="float-right" onClick={this.handleNextPrevClick(1)(3)}>
                      next
                    </MDBBtn>
                  </MDBCol>
                  )}
                  {this.state.formActivePanel1 === 3 && (
                  <MDBCol md="12">
                    <h3 className="font-weight-bold pl-0 my-4">
                      <strong>MDBStep 3</strong>
                    </h3>
                    <MDBBtn color="indigo" rounded className="float-left" onClick={this.handleNextPrevClick(1)(2)}
                      autoFocus={this.calculateAutofocus(1)}>
                      previous
                    </MDBBtn>
                    <MDBBtn color="default" rounded className="float-right" onClick={this.handleSubmission}>
                      submit
                    </MDBBtn>
                  </MDBCol>
                  )}
                </MDBRow>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    );
  };
}

export default StepperExample; */