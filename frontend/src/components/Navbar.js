import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = { auth: props.auth }
  }

  render = () => {
    const { isAuthenticated, login, logout } = this.state.auth
    return (
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark fixed-top'>
        <div className='container'>
          <span className='navbar-brand'>Pet-store</span>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarText'
            aria-controls='navbarText'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarText'>
            <ul className='navbar-nav mr-auto'>
              <li className='nav-item'>
                <Link className='nav-link' to='/'>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                {isAuthenticated() ? (
                  <Link className='nav-link' to='/profile'>
                    Profile
                  </Link>
                ) : null}{' '}
              </li>
            </ul>
            <ul className='navbar-nav ml-auto'>
              <li className='nav-item'>
                <span
                  type='button'
                  className='nav-link'
                  data-toggle='modal'
                  data-target='#cartModal'>
                  Cart
                </span>
              </li>
              <li className='nav-item'>
                <a
                  className='nav-link'
                  onClick={isAuthenticated() ? logout : login}>
                  {isAuthenticated() ? 'Log out' : 'Log in'}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}
export default Navbar
