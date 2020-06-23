import React, { Component } from 'react';
import Navigation from './Navigation'
import Footer from './footer'
import About from './About'
import Mylist from './Mylist'
import Home from './home'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'

class Main extends Component {
    render() {
        return (
            <Router>
                <div>
                <Navigation/>
                <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/mylist" component={Mylist}/>
                </Switch>
                <Footer/>
            </div>
            </Router>
        )
    }
}

export default Main
