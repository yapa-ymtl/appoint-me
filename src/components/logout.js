import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { app } from '../Config/base'

class Logout extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false
    }
  }

  componentWillMount() {
    app.auth().signOut().then((user) => {
      this.setState({ redirect: true })
    })
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/" />
    }

    return (
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
}

export default Logout