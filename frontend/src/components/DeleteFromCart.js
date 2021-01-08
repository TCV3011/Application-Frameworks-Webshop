import React, { Component } from 'react'

class DeleteFromCart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentProd: this.props.currentProd
    }
  }
  submitHandler = () => {
    this.props.onSubmit(this.state.currentProd)
  }
  render() {
    return (
      <button
        type='button'
        className='btn btn-danger'
        onClick={this.submitHandler}
      >
        Delete
      </button>
    )
  }
}

export default DeleteFromCart
