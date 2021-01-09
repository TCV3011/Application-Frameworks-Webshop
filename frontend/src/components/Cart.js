import React, { Component } from 'react'
import DeleteFromCart from './DeleteFromCart'
import { Link } from 'react-router-dom'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      SelectedProducts: localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : [],
      TotalPrice: localStorage.getItem('total_price')
        ? parseFloat(localStorage.getItem('total_price'))
        : 0,
      auth: props.auth
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.name

    let key = parseInt(name.replace('amount', ''))
    let alteredValue = parseInt(value)
    this.setState(
      (prevState) => ({
        SelectedProducts: prevState.SelectedProducts.map((el, index) =>
          index === key
            ? {
                ...el,
                amount: alteredValue,
                ppp: (el.product.price * alteredValue).toFixed(2)
              }
            : el
        )
      }),
      () => {
        /**
         * Code below is based on https://medium.com/@iamsongcho/is-setstate-async-b1947fbb25e5
         * Used to view changed directly after onchange
         * Consulted on 09/01/2021
         */
        localStorage.setItem(
          'cart',
          JSON.stringify(this.state.SelectedProducts)
        )
        let tempTotalPrice = 0
        for (const cp of JSON.parse(localStorage.getItem('cart'))) {
          tempTotalPrice += parseFloat(cp.ppp)
        }
        localStorage.setItem('total_price', tempTotalPrice.toFixed(2))
        this.setState({})
      }
    )
  }

  componentDidMount = () => {
    console.log(this.state.SelectedProducts)
  }

  deleteProduct = (index) => {
    console.log(index)
    this.state.SelectedProducts.splice(index, 1)
  }

  render = () => {
    const { isAuthenticated, login } = this.state.auth
    return (
      <>
        <div
          className='modal fade'
          id='cartModal'
          tabIndex='-1'
          aria-labelledby='cartModalLabel'
          aria-hidden='true'>
          <div className='modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='cartModalLabel'>
                  Cart
                </h5>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'>
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
                          <td>
                            <input
                              type='number'
                              min='1'
                              max={product.product.amount}
                              placeholder='1'
                              name={'amount' + index}
                              id={'amount' + index}
                              value={
                                localStorage.getItem('cart')
                                  ? JSON.parse(localStorage.getItem('cart'))[
                                      index
                                    ].amount
                                  : undefined
                              }
                              onChange={this.handleInputChange}
                              required
                            />
                          </td>
                          <td>€ {product.ppp}</td>
                          <td>
                            <DeleteFromCart
                              currentProd={index}
                              onSubmit={this.deleteProduct}
                            />
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                  <tfoot className='tfoot'>
                    <tr>
                      <td colSpan='4'>
                        <strong>
                          Total price: €{' '}
                          {localStorage.getItem('total_price')
                            ? JSON.parse(localStorage.getItem('total_price'))
                            : 0}
                        </strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className='modal-footer'>
                <button
                  type='button'
                  className='btn btn-secondary'
                  data-dismiss='modal'>
                  Close
                </button>
                {isAuthenticated() ? (
                  <Link
                    to='/checkout'
                    type='button'
                    className='btn btn-outline-secondary'
                    data-dismiss='modal'>
                    Checkout
                  </Link>
                ) : (
                  <button
                    type='button'
                    className='btn btn-outline-secondary'
                    data-dismiss='modal'
                    onClick={login}>
                    Log in to checkout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Cart
