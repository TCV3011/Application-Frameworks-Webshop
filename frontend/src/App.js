import './App.css'
import React, { Component } from 'react'
import Auth from './auth/Auth'
import { Route, Redirect } from 'react-router-dom'
import Home from './components/Home'
import Callback from './components/Callback'
import Profile from './components/Profile'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: new Auth(this.props.history)
    }
  }

  render() {
    return (
      <>
        <div className='App'>
          <Route
            path='/'
            exact
            render={(props) => <Home auth={this.state.auth} {...props} />}
          />
          <Route
            path='/callback'
            render={(props) => <Callback auth={this.state.auth} {...props} />}
          />
          <Route
            path='/profile'
            render={(props) =>
              this.state.auth.isAuthenticated() ? (
                <Profile auth={this.state.auth} {...props} />
              ) : (
                <Redirect to='/' />
              )
            }
          />
        </div>
      </>
    )
  }
}

export default App
