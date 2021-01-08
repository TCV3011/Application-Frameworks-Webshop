import React, { Component } from 'react'
import Intro from './Intro'
import Cart from './Cart'
import Products from './Products'
import Navbar from './Navbar'

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      auth: props.auth,
      CartProducts: []
    }
  }
  AddToCart = (product) => {
    console.log('testing add to cart')
    console.log(product)
    let isInCart = false
    for (const cp of this.state.CartProducts) {
      if (product.product.name === cp.product.name) {
        // product already in cart
        isInCart = true
      }
    }
    if (isInCart === false) {
      this.state.CartProducts.push(product)
    }

    console.log(this.state.CartProducts)
    // localStorage.setItem('cartProducts', this.state.CartProducts)
    this.child.setState({
      SelectedProducts: this.state.CartProducts
    })
  }

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
          products={this.state.CartProducts}
          setState={(state) => this.setState(state)}
        />
      </div>
    )
  }
}

export default Home
