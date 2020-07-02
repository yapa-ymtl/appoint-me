import React, { Component } from 'react';
import ResetPassword from './resetPassword'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {app,base} from '../Config/base'

import Navigation from './Navigation'
import Footer from './footer'
import About from './About'
import Mylist from './Mylist'
import Home from './home'
import Rate from './rateUs'


class Main extends Component {
    constructor()
    {
        super();
        this.state={
            authenticated:false,
            loading:true,
        }
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
        if(this.state.loading===true)
        {
            return(
                <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-blue-only">
                    <div class="circle-clipper left">
                    <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                    <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                    <div class="circle"></div>
                    </div>
                </div>
                </div>
            )
        }
        return (
                <Router>
                    <div>
                        <Navigation authenticated={this.state.authenticated}/>
                        <h1 style={{height:70}}> &nbsp</h1>
                        <Switch>
                        <Route path="/" exact component={Home}/>
                        <Route path="/about" component={About}/>
                        <Route path="/mylist" component={Mylist}/>
                        <Route path="/jdjowanajk"  component={ResetPassword}/>
                        <Route path="rate" component={Rate}/>
                        </Switch>
                        <Footer/>
                    </div>
                </Router>
        )
    }
}

export default Main
