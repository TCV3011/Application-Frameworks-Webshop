import React, { Component } from 'react'

class AddToCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentProd: this.props.product,
      amount: 1
    }
  }

  submitHandler = () => {
    let tempProd = {
      product: this.state.currentProd,
      amount: this.state.amount
    }
    tempProd.ppp = tempProd.product.price * tempProd.amount
    this.props.onSubmit(tempProd)
  }
  render() {
    return (
      <div className='btn-group mt-auto'>
        <button
          disabled
          type='button'
          className='btn btn-sm btn-outline-secondary'>
          € {this.state.currentProd.price}
        </button>
        <button
          type='button'
          className='btn btn-sm btn-outline-secondary'
          onClick={this.submitHandler}
          data-toggle='modal'
          data-target='#cartModal'>
          Add to cart
        </button>
      </div>
    )
  }
}

export default AddToCart
