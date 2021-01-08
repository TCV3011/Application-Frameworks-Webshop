import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = { profile: null, error: '' }
  }

  componentDidMount = () => {
    this.loadUserProfile()
  }
  loadUserProfile = () => {
    this.props.auth.getProfile((profile, error) =>
      this.setState({ profile, error })
    )
  }
  render() {
    const { profile } = this.state
    if (!profile) return null
    console.log('profile')
    return (
      <>
        <div className='container mt-5'>
          <div className='card profileCard'>
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
      </>
    )
  }
}

export default Profile
