import React from 'react';
import {MDBIcon,MDBBtn} from 'mdbreact'

function Footer(props) {
  //var href = this.props.history.createHref('https://www.facebook.com', myParams);
    return(
        <footer className="page-footer font-small special-color-dark pt-4 mr-0">
          <div className="container">
            <ul className="text-center">
              <li className="list-inline-item">
                <MDBBtn size="sm" tag="a"  social="fb" >
                  <a rel="noopener noreferrer" href="https://www.facebook.com" target="_blank"><MDBIcon fab icon="facebook-f" /></a>
                </MDBBtn>
              </li>
              <li className="list-inline-item">
                <MDBBtn size="sm" tag="a"  social="tw">
                <a rel="noopener noreferrer" href="https://www.twitter.com" target="_blank"><MDBIcon fab icon="twitter" /></a>
                </MDBBtn>
              </li>
              <li className="list-inline-item">
              <MDBBtn size="sm" tag="a"  social="gplus">
              <a rel="noopener noreferrer" href="https://www.google.com" target="_blank"><MDBIcon fab icon="google-plus-g" /></a>
                </MDBBtn>
              </li>
              <li className="list-inline-item">
              <MDBBtn size="sm" tag="a"  social="li">
              <a rel="noopener noreferrer" href="https://www.linkedin.com" target="_blank"><MDBIcon fab icon="linkedin-in" /></a>
                </MDBBtn>
              </li>
            </ul>        
          </div>
          <div className="footer-copyright text-center py-3">© 2020 Copyright:
            <a href="https://Appointme.com/"> Appointme.com</a>
          </div>        
        </footer>
    )
}

export default Footer;