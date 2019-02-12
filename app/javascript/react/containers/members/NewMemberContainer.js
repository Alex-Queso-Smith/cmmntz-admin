import React from 'react';

import { Input, RadioButton } from '../../components/FormComponents';
import { FetchWithPush, CreateErrorElements, ErrorClassValidation } from '../../util/CoreUtil';

class NewMemberContainer extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    role: "",
    newMemberErrors: {}
  }

  handleSubmit = this.handleSubmit.bind(this);
  handleChange = this.handleChange.bind(this);
  handleClear = this.handleClear.bind(this);

  handleChange(event){
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({ [name]: value })
  }

  handleClear(){
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      role: "",
      newMemberErrors: {}
    })
  }

  handleSubmit(event){
    event.preventDefault();

    var newMember = new FormData();

    var { firstName, lastName, email, role, password, passwordConfirmation } = this.state;

    newMember.append("customer[first_name]", firstName);
    newMember.append("customer[last_name]", lastName);
    newMember.append("customer[email]", email);
    newMember.append("customer[role]", role);
    newMember.append("customer[password]", password);
    newMember.append("customer[password_confirmation]", passwordConfirmation);

    FetchWithPush(this, `/api/v1/customers.json`, '', 'POST', 'newMemberErrors', newMember)
      .then(body => {
        if (!body.errors) {
          this.props.updateDisplay('');
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));

  }

  render(){

    var { newMemberErrors } = this.state
    var firstNameError, lastNameError, emailError, passwordError, passwordConfirmationError, roleError

    firstNameError = CreateErrorElements(newMemberErrors.first_name, "First Name")
    lastNameError = CreateErrorElements(newMemberErrors.last_name, "Last Name")
    emailError = CreateErrorElements(newMemberErrors.email, "Email")
    passwordError = CreateErrorElements(newMemberErrors.password, "Password")
    passwordConfirmationError = CreateErrorElements(newMemberErrors.password_confirmation, "Password Confirmation")
    roleError = CreateErrorElements(newMemberErrors.role, "Role")

    var firstNameClass = ErrorClassValidation(firstNameError)
    var lastNameClass = ErrorClassValidation(lastNameError)
    var emailClass = ErrorClassValidation(emailError)
    var passwordClass = ErrorClassValidation(passwordError)
    var passwordConfirmationClass = ErrorClassValidation(passwordConfirmationError)


    return(
      <div id="cf-new-member-container">
        <form id="cf-new-member-form" className="form container-fluid" onSubmit={this.handleSubmit}>
          <Input
            name="firstName"
            label="First Name"
            addClass={''}
            type='text'
            content={this.state.firstName}
            onChange={this.handleChange}
            addClass={firstNameClass}
          />
          {firstNameError}
          <Input
            name="lastName"
            label="Last Name"
            type='text'
            content={this.state.lastName}
            onChange={this.handleChange}
            addClass={lastNameClass}
          />
          {lastNameError}
          <Input
            name="email"
            label="Email"
            type='text'
            content={this.state.email}
            onChange={this.handleChange}
            addClass={emailClass}
          />
          {emailError}
          <Input
            name="password"
            label="Password"
            type='password'
            content={this.state.password}
            onChange={this.handleChange}
            addClass={passwordClass}
          />
          {passwordError}
          <Input
            name="passwordConfirmation"
            label="Password Confirmation"
            type='password'
            content={this.state.passwordConfirmation}
            onChange={this.handleChange}
            addClass={passwordConfirmationClass}
          />
          {passwordConfirmationError}
          <div className="row">
            <RadioButton
              name="role"
              label="Admin"
              value="admin"
              checked={ this.state.role === "admin" }
              onChange={this.handleChange}
              className={"col-3"}
            />
            <RadioButton
              name="role"
              label="Artist"
              value="artist"
              checked={ this.state.role ==="artist" }
              onChange={this.handleChange}
              className={"col-3"}
            />
          </div>
          {roleError}
          <div className="row">
            <div className="col-12">
              <button type="Submit" id="create-member-button" className="btn btn-sm purple-button float-right" onClick={this.handleSubmit}>Create Member</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default NewMemberContainer;
