import React from 'react'

import { Input } from '../../components/FormComponents';
import { FetchWithPush, CreateErrorElements, CheckInputValidation, ErrorClassValidation } from '../../util/CoreUtil';

class SignupContainer extends React.Component {
  state = {
    galleryName: '',
    galleryUrl: '',
    galleryTier: '',
    customerFirstName: '',
    customerLastName: '',
    customerEmail: '',
    customerPassword: '',
    customerPasswordConfirmation: '',
    formInvalid: true,
    signupErrors: {}
  }

  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  componentDidMount() {
    var query = this.props.location.search.replace('?','').split('&')
    var parsedQuery = {};

    for (var i = 0; i < query.length; i++) {
      var [k,v] = query[i].split("=")
      parsedQuery[k] = v
    }
    var tier = (parsedQuery["t"]) ? parsedQuery["t"] : 1
    this.setState({ galleryTier: parseInt(tier)})
  }

  componentDidUpdate(prevProps, prevState){
    if (
      prevState.galleryName != this.state.galleryName ||
      prevState.galleryUrl != this.state.galleryUrl ||
      prevState.customerFirstName != this.state.customerFirstName ||
      prevState.customerLastName != this.state.customerLastName ||
      prevState.customerEmail != this.state.customerEmail ||
      prevState.customerPassword != this.state.customerPassword ||
      prevState.customerPasswordConfirmation != this.state.customerPasswordConfirmation
    ) {
      var { galleryName, galleryUrl, customerFirstName, customerLastName, customerEmail, customerPassword, customerPasswordConfirmation } = this.state

      CheckInputValidation(this, [galleryName, galleryUrl, customerFirstName, customerLastName, customerEmail, customerPassword, customerPasswordConfirmation])
    }
  }

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

    var { galleryName, galleryUrl, galleryTier, customerFirstName, customerLastName, customerEmail, customerPassword, customerPasswordConfirmation } = this.state

    newSignup.append("signup[gallery_name]", galleryName);
    newSignup.append("signup[gallery_url]", galleryUrl);
    newSignup.append("signup[gallery_tier]", galleryTier);
    newSignup.append("signup[customer_first_name]", customerFirstName);
    newSignup.append("signup[customer_last_name]", customerLastName);
    newSignup.append("signup[customer_email]", customerEmail);
    newSignup.append("signup[customer_password]", customerPassword);
    newSignup.append("signup[customer_password_confirmation]", customerPasswordConfirmation);

    FetchWithPush(this, `/api/v1/signups.json`, '', 'POST', 'signupErrors', newSignup)
    .then(body => {
      if (!body.errors) {

        var element = document.getElementById('ca-app');
        element.setAttribute('data-customer-id', body.id);
        element.setAttribute('data-customer-name', body.name);
        element.setAttribute('data-customer-gallery', body.gallery);
        element.setAttribute('data-gallery-id', body.galleryId);
        this.props.updateAppData(body.id, body.name, body.gallery, body.galleryId);

        this.props.history.push('/help');
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    var { galleryName, galleryUrl, customerFirstName, customerLastName, customerEmail, customerPassword, customerPasswordConfirmation, signupErrors } = this.state

    var { signupErrors } = this.state;
    if (signupErrors.gallery) {
      var galleryNameError, galleryUrlError;
      galleryNameError = CreateErrorElements(signupErrors.gallery[0].name, "Gallery Name")
      galleryUrlError = CreateErrorElements(signupErrors.gallery[0].site_url, "Gallery URL")

      var galleryNameClass = ErrorClassValidation(galleryNameError);
      var galleryUrlClass = ErrorClassValidation(galleryUrlError);
    }

    if (signupErrors.customer) {
      var customerFirstNameError, customerLastNameError, customerEmailError, customerPasswordError, customerPasswordConfirmationError;
      customerFirstNameError = CreateErrorElements(signupErrors.customer[0].first_name, "First Name")
      customerLastNameError = CreateErrorElements(signupErrors.customer[0].last_name, "Last Name")
      customerEmailError = CreateErrorElements(signupErrors.customer[0].email, "Email")
      customerPasswordError = CreateErrorElements(signupErrors.customer[0].password, "Password")
      customerPasswordConfirmationError = CreateErrorElements(signupErrors.customer[0].password_confirmation, "Password Confimation")

      var customerFirstNameClass = ErrorClassValidation(customerFirstNameError)
      var customerLastNameClass = ErrorClassValidation(customerLastNameError)
      var customerEmailClass = ErrorClassValidation(customerEmailError)
      var customerPasswordClass = ErrorClassValidation(customerPasswordError)
      var customerPasswordConfirmationClass = ErrorClassValidation(customerPasswordConfirmationError)
    }

    return(
      <div className="jumbotron center-form">

        <h2>Sign Up for CMMNTZ</h2>
        <Input
          name="galleryName"
          placeholder="Site Name"
          onChange={this.handleChange}
          content={galleryName}
          type="input"
          addClass={galleryNameClass}
        />
        {galleryNameError}
        <Input
          name="galleryUrl"
          placeholder="Site Url"
          onChange={this.handleChange}
          content={galleryUrl}
          type="input"
          addClass={galleryUrlClass}
        />
        {galleryUrlError}
        <Input
          name="customerFirstName"
          placeholder="Your First Name"
          onChange={this.handleChange}
          content={customerFirstName}
          type="input"
          addClass={customerFirstNameClass}
        />
        {customerFirstNameError}
        <Input
          name="customerLastName"
          placeholder="Your Last Name"
          onChange={this.handleChange}
          content={customerLastName}
          type="input"
          addClass={customerLastNameClass}
        />
        {customerLastNameError}
        <Input
          name="customerEmail"
          placeholder="email@org.com"
          onChange={this.handleChange}
          content={customerEmail}
          type="input"
          addClass={customerEmailClass}
        />
        {customerEmailError}
        <Input
          name="customerPassword"
          placeholder="Your Password"
          onChange={this.handleChange}
          content={customerPassword}
          type="password"
          addClass={customerPasswordClass}
        />
        {customerPasswordError}
        <Input
          name="customerPasswordConfirmation"
          placeholder="Your Password (again)"
          onChange={this.handleChange}
          content={customerPasswordConfirmation}
          type="password"
          addClass={customerPasswordConfirmationClass}
        />
        {customerPasswordConfirmationError}
        <button disabled={this.state.formInvalid} onClick={this.handleSubmit} className="float-right btn btn-dark">
          Create your Account
        </button>

      </div>
    )
  }
}


export default SignupContainer;
