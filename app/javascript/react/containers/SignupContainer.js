import React from 'react'

import { Input } from '../components/FormComponents';
import { FetchWithUpdate } from '../util/CoreUtil';

class SignupContainer extends React.Component {
  state = {
    galleryName: '',
    galleryUrl: '',
    customerFirstName: '',
    customerLastName: '',
    customerEmail: '',
    customerPassword: '',
    customerPasswordConfirmation: '',
    signupErrors: {}
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
    event.preventDefault();

    var newSignup = new FormData();

    var { galleryName, galleryUrl, customerFirstName, customerLastName, customerEmail, customerPassword, customerPasswordConfirmation } = this.state

    newSignup.append("signup[gallery_name]", galleryName);
    newSignup.append("signup[gallery_url]", galleryUrl);
    newSignup.append("signup[customer_first_name]", customerFirstName);
    newSignup.append("signup[customer_last_name]", customerLastName);
    newSignup.append("signup[customer_email]", customerEmail);
    newSignup.append("signup[customer_password]", customerPassword);
    newSignup.append("signup[customer_password_confirmation]", customerPasswordConfirmation);

    FetchWithUpdate(this, `/api/v1/signups.json`, 'POST', newSignup)
    .then(data => {
        if (data.errors) {
          this.setState({signupErrors: data.errors})
        } else {
          // go to embed
        }
      }
    )
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    var { galleryName, galleryUrl, customerFirstName, customerLastName, customerEmail, customerPassword, customerPasswordConfirmation, signupErrors } = this.state

    return(
      <div className="jumbotron center-form">

        <h2>Sign Up for Classifilter</h2>
        <Input
          name="galleryName"
          placeholder="Site Name"
          onChange={this.handleChange}
          content={galleryName}
          type="input"
        />
        <Input
          name="galleryUrl"
          placeholder="Site Url"
          onChange={this.handleChange}
          content={galleryUrl}
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
