import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: null,
      error: ''
    }
  }

  componentDidMount = () => {
    this.loadUserProfile()
  }

  loadUserProfile = () => {
    this.props.auth.getProfile((profile, error) => {
      this.setState({ profile, error })
    })
  }

  makeOrder = () => {
    const email = this.state.profile.email
    let products = ''
    const price = localStorage.getItem('total_price')
    for (const cp of JSON.parse(localStorage.getItem('cart'))) {
      products += `${cp.amount}x ${cp.product.name} | `
    }
    fetch(
      encodeURI(
        `http://localhost:8080/api/orders?email=${email}&products=${products}&price=${price}`
      ),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'x-www-form-url-encoded',
          accept: 'application/json'
        }
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log(`create order response: ${res.status}`)
          return res.json()
        }
        console.log(`create order error: ${res.statusText}`)
      })
      .then((json) => {
        console.log(`product created, got: ${JSON.stringify(json)}`)
        for (const cp of JSON.parse(localStorage.getItem('cart'))) {
          fetch(
            `http://localhost:8080/api/products/${cp.product.id}?amount=${cp.amount}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'x-www-form-url-encoded',
                accept: 'application/json'
              }
            }
          )
            .then((res) => {
              if (res.ok) {
                console.log(`amount updated response: ${res.status}`)
                return res.json()
              }
              console.log(`amount updated error: ${res.statusText}`)
            })
            .then((json) => {
              console.log(`amount updated, got: ${JSON.stringify(json)}`)
              localStorage.removeItem('cart')
              localStorage.removeItem('total_price')
              window.location.href = window.location.href.replace(
                'checkout',
                ''
              )
            })
            .catch((err) => {
              console.log(`error: ${err}`)
            })
        }
      })
      .catch((err) => {
        console.log(`error: ${err}`)
      })
  }
  render() {
    return (
      <div className='container mt-5'>
        <h1>Checkout</h1>
        <div className='card'>
          <div className='card-body'>
            <p>This is your current order:</p>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th scope='col'>Product</th>
                  <th scope='col'>Price/piece</th>
                  <th scope='col'>Price</th>
                </tr>
              </thead>
              <tbody>
                {JSON.parse(localStorage.getItem('cart')).map((cp, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <strong>{cp.amount}x</strong> {cp.product.name}
                      </td>
                      <td>€{cp.product.price}</td>
                      <td>€{cp.ppp}</td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan='3'>
                    <strong>Total: </strong> €
                    {localStorage.getItem('total_price')}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div className='card-footer'>
            <Link to='/' type='button' className='btn btn-danger'>
              Cancel
            </Link>
            <button
              type='button'
              className='btn btn-success ml-4'
              onClick={this.makeOrder}>
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Checkout
