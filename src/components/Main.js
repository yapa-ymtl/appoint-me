import React, { Component } from 'react';
import Header from './header'
import Test from './test'
import Footer from './footer'

class Main extends Component {
    render() {
        return (
            <div>
                <Header/>
                <h1>Home</h1>
                <Test/>
                <Footer/>
            </div>
        )
    }
}

export default Main
