import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = { profile: null, error: '', orders: [] }
  }

  componentDidMount = () => {
    this.loadUserProfileAndOrders()
  }
  loadUserProfileAndOrders = () => {
    this.props.auth.getProfile((profile, error) => {
      console.log(`email to fetch ${profile.email}`)
      fetch(`http://localhost:8080/api/orders?email=${profile.email}`, {
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
          console.log(`orders: ${json}`)
          this.setState({ orders: json })
          console.log(this.state.orders)
          this.setState({ profile, error })
        })
        .catch((err) => {
          console.log(`error: ${err}`)
        })
    })
  }
  render() {
    const { profile } = this.state
    if (!profile) return null
    console.log('profile')
    return (
      <>
        <div className='container mt-5'>
          <div className='row'>
            <div className='col-md-4'>
              <div className='card'>
                <div className='card-header'>Profile</div>
                <img
                  src={profile.picture}
                  className='card-img-top'
                  alt='profile pic'
                />
                <div className='card-body'>
                  <h5 className='card-title'>{profile.name}</h5>
                  <p>{profile.email}</p>
                  <Link className='btn btn-primary' to='/'>
                    Go back
                  </Link>
                </div>
              </div>
            </div>
            <div className='col-md-8'>
              <h4>Orders</h4>
              <div className='table-responsive'>
                <table className='table'>
                  <thead className='thead-dark'>
                    <tr>
                      <th scope='col'>#</th>
                      <th scope='col'>Products</th>
                      <th scope='col'>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.orders.length === 0 ? (
                      <tr>
                        <td colSpan='3'>You don't have any orders yet.</td>
                      </tr>
                    ) : (
                      this.state.orders.map((order, index) => {
                        return (
                          <tr key={index}>
                            <td>{order.id}</td>
                            <td>{order.products}</td>
                            <td>{order.price}</td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Profile
