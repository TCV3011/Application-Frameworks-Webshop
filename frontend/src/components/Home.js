import React, { Component } from 'react'
import Intro from './Intro'
import Cart from './Cart'
import Products from './Products'
import Navbar from './Navbar'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: props.auth
    }
  }
  AddToCart = (product) => {
    let isInCart = false
    if (localStorage.getItem('cart')) {
      for (const cp of JSON.parse(localStorage.getItem('cart'))) {
        if (product.product.name === cp.product.name) {
          // product already in cart
          isInCart = true
        }
      }
    }
    if (isInCart === false) {
      this.saveProductToLocalStorageCart(product)
      console.log(`product price: ${product.product.price}`)
      let tempTotalPrice = localStorage.getItem('total_price')
        ? parseFloat(localStorage.getItem('total_price')) +
          product.product.price
        : 0 + product.product.price
      localStorage.setItem('total_price', tempTotalPrice)
    }

    this.child.setState({
      SelectedProducts: JSON.parse(localStorage.getItem('cart'))
    })
  }

  /**
   * Code below is based on https://stackoverflow.com/questions/16083919/push-json-objects-to-array-in-localstorage
   * Used to put JSON object in to array in local storage
   * Consulted on 08/01/2021
   */

  saveProductToLocalStorageCart = (product) => {
    var a = []
    // Parse the serialized data back into an array of objects
    a = JSON.parse(localStorage.getItem('cart')) || []
    // Push the new data (whether it be an object or anything else) onto the array
    a.push(product)
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem('cart', JSON.stringify(a))
  }

  /**
   * Code below is based on https://linguinecode.com/post/get-child-component-state-from-parent-component
   * Used to access the state of child component
   */

  render() {
    return (
      <div>
        <Navbar auth={this.state.auth} />
        <Intro />
        <div className='container'>
          <Products addToCart={this.AddToCart} />
        </div>
        <Cart
          ref={(ref) => (this.child = ref)}
          setState={(state) => this.setState(state)}
          auth={this.state.auth}
        />
      </div>
    )
  }
}

export default Home
