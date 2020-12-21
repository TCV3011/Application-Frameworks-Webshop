import './App.css'
import React, { Component } from 'react'
import Products from './components/Products'
import Navbar from './components/Navbar'
import Intro from './components/Intro'
import Cart from './components/Cart'

function App() {
  return <HeadComponent />
}

class HeadComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      CartProducts: []
    }
  }
  AddToCart = (product) => {
    console.log('testing add to cart')
    console.log(product)
    this.state.CartProducts.push(product)
    console.log(this.state.CartProducts)
    this.child.setState({ SelectedProducts: this.state.CartProducts })
  }
  render() {
    return (
      <div className='App'>
        <Navbar />
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

export default App
