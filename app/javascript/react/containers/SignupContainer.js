import React from 'react'

import { Input } from '../components/FormComponents';

class SignupContainer extends React.Component {
  state = {
    galleryName: '',
    customerFirstName: '',
    customerLastName: '',
    customerEmail: '',
    customerPassword: '',
    customerPasswordConfirmation: ''

  }

  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  handleChange(event) {
    const target = event.target
    const name = target.name
    const value = target.value

    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    alert("click")
  }

  render(){
    var { galleryName, customerFirstName, customerLastName, customerEmail, customerPassword, customerPasswordConfirmation } = this.state

    return(
      <div className="jumbotron center-form">
        <h2>Sign Up for Classifilter</h2>
        <Input
          name="galleryName"
          placeholder="Gallery Name"
          onChange={this.handleChange}
          content={galleryName}
          type="input"
        />
        <Input
          name="customerFirstName"
          placeholder="Your First Name"
          onChange={this.handleChange}
          content={customerFirstName}
          type="input"
        />
        <Input
          name="customerLastName"
          placeholder="Your Last Name"
          onChange={this.handleChange}
          content={customerLastName}
          type="input"
        />
        <Input
          name="customerEmail"
          placeholder="email@org.com"
          onChange={this.handleChange}
          content={customerEmail}
          type="input"
        />
        <Input
          name="customerPassword"
          placeholder="Your Password"
          onChange={this.handleChange}
          content={customerPassword}
          type="password"
        />
        <Input
          name="customerPasswordConfirmation"
          placeholder="Your Password (again)"
          onChange={this.handleChange}
          content={customerPasswordConfirmation}
          type="password"
        />

      <button onClick={this.handleSubmit} className="float-right btn btn-dark">
          Create your Account
        </button>

      </div>
    )
  }
}


export default SignupContainer;
