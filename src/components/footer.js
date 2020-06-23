import React from 'react';
import {MDBIcon,MDBBtn} from 'mdbreact'

function Footer(props) {
    return(
        <footer className="page-footer font-small special-color-dark pt-4 mr-0">
        
          <div className="container">
        
            <ul className="text-center">
              <li className="list-inline-item">
                <MDBBtn size="sm" tag="a"  social="fb">
                    <MDBIcon fab icon="facebook-f" />
                </MDBBtn>
              </li>
              <li className="list-inline-item">
                <MDBBtn size="sm" tag="a"  social="tw">
                    <MDBIcon fab icon="twitter" />
                </MDBBtn>
              </li>
              <li className="list-inline-item">
              <MDBBtn size="sm" tag="a"  social="gplus">
                    <MDBIcon fab icon="google-plus-g" />
                </MDBBtn>
              </li>
              <li className="list-inline-item">
              <MDBBtn size="sm" tag="a"  social="li">
                    <MDBIcon fab icon="linkedin-in" />
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