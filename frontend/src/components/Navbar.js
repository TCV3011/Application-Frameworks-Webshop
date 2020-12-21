import React, { Component } from 'react'

class Navbar extends Component {
  render = () => {
    return (
      <div>
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
          <div className='container'>
            <span className='navbar-brand'>Pet-store</span>
            <button
              className='navbar-toggler'
              type='button'
              data-toggle='collapse'
              data-target='#navbarText'
              aria-controls='navbarText'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarText'>
              <ul className='navbar-nav mr-auto'>
                <li className='nav-item active'>
                  <a className='nav-link' href='#'>
                    Home <span className='sr-only'>(current)</span>
                  </a>
                </li>
              </ul>
              <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                  <span
                    type='button'
                    className='nav-link'
                    data-toggle='modal'
                    data-target='#cartModal'
                  >
                    Cart
                  </span>
                </li>
                <li className='nav-item'>
                  <a className='nav-link' href='#'>
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
export default Navbar
