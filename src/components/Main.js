import React, { Component } from 'react';
import ResetPassword from './resetPassword'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {app} from '../Config/base'
import { Spinner, } from 'reactstrap';
import firebase from 'firebase'

import Navigation from './Navigation'
import Footer from './footer'
import About from './About'
import Appointment from './appnmntModal'
import Rate from './rateUs'
import Profile from './profile'
import Home from './home';
import TodayList from './MyList'



class Main extends Component {
    constructor()
    {
        super();
        this.state={
            authenticated:false,
            loading:true,
            userType:null,
        }
        document.title ="AppointMe | Home";
    }


    

    componentWillMount()
    {
        this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.database().ref('Users/' + user.uid).once('value').then((snapshot)=> {
                    this.setState({
                        userType:snapshot.val().type,
                        loading:false,
                        authenticated: true,
                    }) 
                })
            } else {
              this.setState({
                authenticated: false,
                loading: false,
              }) 
            }
        })
    }

   

    render() {
        if(this.state.loading===true)
        {
            return(
                <div
                    style={{
                        position: 'absolute', left: '50%', top: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                    >
                    <Spinner type="grow" color="primary" size="lg" />
                </div>
            )
        }
        return (
            
            <Router>
                <div>
                    <Navigation authenticated={this.state.userType}/>
                    <h1 style={{height:100}}> &nbsp</h1>
                    <Switch>
                        <Route path="/" exact component={(props)=>(<Home {...props} authenticated={this.state.userType}/>)}/>
                        <Route path="/about" component={About}/>
                        <Route path="/jdjowanajk"  component={ResetPassword}/>
                        <Route path="/rate" component={Rate}/>
                        <Route path="/appointment/:id" component={(props)=>(<Appointment {...props} authenticated={this.state.authenticated}/>)}/>
                        <Route path="/profile" component={(props)=>(<Profile {...props} authenticated={this.state.authenticated}/>)}/>
                        <Route path="/today_list" component={(props)=>(<TodayList {...props} authenticated={this.state.userType}/>)}/>
                    </Switch>
                    
                    <Footer/>
                </div>
            </Router>
        )
    }
}

export default Main
