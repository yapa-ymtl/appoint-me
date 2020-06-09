import React, { Component } from 'react';
import Header from './header'
import Test from './test'

class Main extends Component {
    render() {
        return (
            <div>
                <Header/>
                <h1>Home</h1>
                <Test/>
            </div>
        )
    }
}

export default Main
