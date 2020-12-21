import React, { Component } from 'react'

class AddToCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentProd: this.props.product,
      amount: 1,
      maxAmount: this.props.amount
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  submitHandler = () => {
    let tempProd = {
      product: this.state.currentProd,
      amount: this.state.amount
    }
    this.props.onSubmit(tempProd)
  }
  render() {
    return (
      <div className='btn-group mt-auto'>
        <input
          type='number'
          min='1'
          max={this.state.maxAmount}
          placeholder='1'
          name='amount'
          value={this.state.amount}
          onChange={this.handleInputChange}
          required
        />
        <button
          type='button'
          className='btn btn-sm btn-outline-secondary'
          onClick={this.submitHandler}
        >
          Add to cart
        </button>
      </div>
    )
  }
}

export default AddToCart
