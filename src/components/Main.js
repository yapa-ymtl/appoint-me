import React, { Component } from 'react';
import Navigation from './Navigation'
import Footer from './footer'
import About from './About'
import Mylist from './Mylist'
import Home from './home'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'


class Main extends Component {
    constructor()
    {
        super();
        this.state={
            authenticated:false,
        }
    }
    render() {
        return (
                <Router>
                    <div>
                        <Navigation authenticated={this.state.authenticated}/>
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
