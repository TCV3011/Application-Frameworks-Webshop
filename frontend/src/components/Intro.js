import React, { Component } from 'react'

class Intro extends Component {
  render = () => {
    return (
      <section className='jumbotron text-center'>
        <div className='container'>
          <h1>Buy stuff for your pet</h1>
          <p className='lead text-muted'>
            Do you have a dog, cat or an other cute animal living with you at
            home?
            <br />
            Make sure you keep him alive with our products or else the pet will
            die!
          </p>
          <p>
            <a href='' className='btn btn-primary'>
              Buy stuff
            </a>
            <a href='' className='btn btn-secondary'>
              Let your pet die
            </a>
          </p>
        </div>
      </section>
    )
  }
}
export default Intro
