import React, { Component } from 'react'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      SelectedProducts: props.products,
      TotalPrice: 0
    }
  }

  componentDidMount = () => {
    console.log('cart componentDidMount')
  }

  render = () => {
    return (
      <div
        className='modal fade'
        id='cartModal'
        tabIndex='-1'
        aria-labelledby='cartModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered modal-lg'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='cartModalLabel'>
                Cart
              </h5>
              <button
                type='button'
                className='close'
                data-dismiss='modal'
                aria-label='Close'
              >
                <span aria-hidden='true'>&times;</span>
              </button>
            </div>
            <div className='modal-body'>
              <table className='table'>
                <thead className='thead'>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Amount</th>
                    <th scope='col'>Price</th>
                    <th scope='col'></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.SelectedProducts.map((product, index) => {
                    return (
                      <tr key={index}>
                        <td>{product.product.name}</td>
                        <td>x{product.amount}</td>
                        <td>
                          €{' '}
                          {(product.product.price * product.amount).toFixed(2)}
                        </td>
                        <td>
                          <button type='button' className='btn btn-danger'>
                            Delete
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot className='tfoot'>
                  <tr>
                    <td colSpan='4'>
                      <strong>Total price: €</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
              >
                Close
              </button>
              <button
                type='button'
                className='btn btn-outline-secondary'
                data-dismiss='modal'
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Cart
