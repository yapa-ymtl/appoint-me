import React, { Component } from 'react';
import ResetPassword from './resetPassword'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {app,base} from '../Config/base'
import { Container,Badge ,Spinner, Row, Col } from 'reactstrap';

import Navigation from './Navigation'
import Footer from './footer'
import About from './About'
import Mylist from './Mylist'
import Appointment from './appnmntModal'
//import Home from './home'
import Rate from './rateUs'
import Profile from './profile'
import Loadable from 'react-loadable'


class Main extends Component {
    constructor()
    {
        super();
        this.state={
            authenticated:false,
            loading:true,
        }
        document.title ="AppointMe | Home";
    }


    

    componentWillMount()
    {
        this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
            if (user) {
              this.setState({
                authenticated: true,
                //currentUser: user,
                loading: false,
              })
            } else {
              this.setState({
                authenticated: false,
                //currentUser: null,
                loading: false,
              }) 
            }
        })
    }

   

    render() {
        const HomeView = Loadable({
            loader: () => import('./home'),
            loading: (props)=> {
                if (props.pastDelay) {
                  return <div style={{ height: "100vh", backgroundColor: "#423e3d" }}  >...</div>;
                } else {
                  return null;
                }
            },
            delay: 300
        })

        if(this.state.loading===true)
        {
            return(
                <div
                    style={{
                        position: 'absolute', left: '50%', top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                    >
                    <Spinner type="grow" color="primary" style={{height:50,width:50,}} />
                </div>
            )
        }
        return (
            <Router>
                <div>
                    <Navigation authenticated={this.state.authenticated}/>
                    <h1 style={{height:100}}> &nbsp</h1>
                    <Switch>
                        <Route path="/" exact component={HomeView}/>
                        <Route path="/about" component={About}/>
                        <Route path="/mylist" component={Mylist}/>
                        <Route path="/jdjowanajk"  component={ResetPassword}/>
                        <Route path="/rate" component={Rate}/>
                        <Route path="/appointment/:id" component={Appointment}/>
                        <Route path="/profile" component={(props)=>(<Profile {...props} authenticated={this.state.authenticated}/>)}/>
                    </Switch>
                    
                    <Footer/>
                </div>
            </Router>
        )
    }
}

export default Main
