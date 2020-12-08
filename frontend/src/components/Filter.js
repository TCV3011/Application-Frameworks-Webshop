import React, { Component } from 'react'

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Categories: []
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount = () => {
    fetch('http://localhost:8080/api/categories', {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
    })
      .then((response) => {
        console.log(`filter componentDidMount`)
        if (response.ok) {
          return response.json()
        }
        console.log('Error: ', response)
      })
      .then((json) => {
        console.log('Categories: ', json)
        this.setState({ Categories: json })
      })
      .catch((error) => {
        console.log('Error: ', error)
      })
  }

  submitHandler = (value) => {
    console.log(`filter submitHandler`)
    this.props.onSubmit(value)
  }

  handleInputChange = (event) => {
    console.log(`filter handleInputChange`)
    const value = event.target.value
    // const name = event.target.name
    this.submitHandler(value)
  }

  render = () => {
    return (
      <div className='form-group'>
        <label htmlFor='filter'>Filter by category</label>
        <select
          className='form-control'
          id='filter'
          name={'category'}
          onChange={this.handleInputChange}
        >
          <option>None</option>
          {this.state.Categories.map((category, index) => {
            return (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
}
export default Filter
