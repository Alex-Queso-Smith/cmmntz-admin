import React from 'react';

import { Input, Checkbox } from '../../components/FormComponents';
import { FetchWithPush, CreateErrorElements, CheckInputValidation, ErrorClassValidation } from '../../util/CoreUtil';

class SessionLoginContainer extends React.Component {
  state = {
    email: '',
    password: '',
    rememberMe: false,
    formInvalid: true,
    loginErrors: {}
  }

  handleSubmit = this.handleSubmit.bind(this);
  handleChange = this.handleChange.bind(this);

  componentDidUpdate(prevProps, prevState){
    if (
      prevState.email != this.state.email ||
      prevState.password != this.state.password
    ) {
      var { email, password } = this.state;

      CheckInputValidation(this, [email, password])
    }
  }


  handleSubmit(event){
    event.preventDefault();

    if (!this.state.formInvalid) {
      var { email, password, rememberMe } = this.state;

      var login = new FormData();

      login.append("customer_session[email]", email);
      login.append("customer_session[password]", password);
      login.append("customer_session[remember_me]", rememberMe);

      FetchWithPush(this, `/api/v1/customer_sessions.json`, '', 'POST', 'loginErrors', login)
      .then(body => {
        if (!body.errors) {
          var element = document.getElementById('ca-app');
          element.setAttribute('data-customer-id', body.id);
          element.setAttribute('data-customer-name', body.name);
          element.setAttribute('data-customer-gallery', body.gallery);
          element.setAttribute('data-gallery-id', body.galleryId);
          this.props.updateAppData(body.id, body.name, body.gallery, body.galleryId)

          this.props.history.push('/');
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  handleChange(event){
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({ [name]: value })
  }

  render(){
    var emailClass, passwordClass, emailError, passwordError;
    var { loginErrors } = this.state;

    emailError = CreateErrorElements(loginErrors.email, "Email")
    passwordError = CreateErrorElements(loginErrors.password, "Password")

    var emailClass = ErrorClassValidation(emailError);
    var passwordClass = ErrorClassValidation(passwordError);

    return(
      <div className="container cmmntz-container center-form">
        <form className="form" id="ca-login-form" onSubmit={this.handleSubmit}>
          <h2 className="ca-login-title text-center">Login</h2>
          <Input
            name="email"
            placeholder="Email"
            onChange={this.handleChange}
            content={this.state.userName}
            type="text"
            addClass={emailClass}
          />
          {emailError}
          <Input
            name="password"
            placeholder="Password"
            onChange={this.handleChange}
            content={this.state.password}
            type="password"
            addClass={passwordClass}
          />
          {passwordError}
          <Checkbox
            name="rememberMe"
            label="Remember Me"
            onChange={this.handleChange}
          />
          <hr />
          <button type="submit" value="Submit" disabled={this.state.formInvalid} className="btn btn-block cf-dark-button">Sign In</button>
        </form>
      </div>
    )
  }
}

export default SessionLoginContainer;
