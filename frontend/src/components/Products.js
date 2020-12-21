import React, { Component } from 'react'
import Filter from './Filter'
import AddToCart from './AddToCart'

class Products extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Products: []
    }
  }

  addProduct = (product) => {
    console.log('testing addProduct')
    console.log(product)
    this.props.addToCart(product)
  }

  componentDidMount = () => {
    fetch('http://localhost:8080/api/products', {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) return res.json()
        console.log(`error: ${res}`)
      })
      .then((json) => {
        console.log(`Products: ${json}`)
        this.setState({ Products: json })
      })
      .catch((err) => {
        console.log(`error: ${err}`)
      })
  }

  filteredProducts = (category) => {
    console.log(`filter products on ${category}`)
    if (category === 'All') this.componentDidMount()
    fetch(`http://localhost:8080/api/products?category=${category}`, {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) return res.json()
        console.log(`error: ${res}`)
      })
      .then((json) => {
        console.log(`Products: ${json}`)
        this.setState({ Products: json })
      })
      .catch((err) => {
        console.log(`error: ${err}`)
      })
  }

  render = () => {
    return (
      <div className='my-2'>
        <h2>Products</h2>
        <Filter onSubmit={this.filteredProducts} />
        <div className='row d-flex flex-row'>
          {this.state.Products.map((product, index) => {
            return (
              <div className='col-md-4 mt-4' key={product.id}>
                <div className='card d-flex flex-column h-100'>
                  <div className='price'>€ {product.price}</div>
                  <img
                    src={product.image}
                    className='card-img-top'
                    alt={product.name}
                  />
                  <div className='card-body d-flex flex-column'>
                    <h5 className='card-title'>{product.name}</h5>
                    <p className='card-text'>{product.description}</p>
                    <AddToCart
                      product={product}
                      amount={product.amount}
                      onSubmit={this.addProduct}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Products
