import React from 'react';

import { Input, RadioButton } from '../../components/FormComponents';
import { FetchDidMount, FetchWithPush, CreateErrorElements, ErrorClassValidation } from '../../util/CoreUtil';

class EditMemberContainer extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    memberErrors: {}
  }

  handleSubmit = this.handleSubmit.bind(this);
  handleChange = this.handleChange.bind(this);
  handleClear = this.handleClear.bind(this);

  componentDidMount(){
    FetchDidMount(this, `/api/v1/customers/${this.props.match.params.id}.json`)
    .then(member => {
      this.setState({
        firstName: member.first_name,
        lastName: member.last_name,
        email: member.email,
        memberErrors: {}
      })
    })
  }
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
      memberErrors: {}
    })
  }

  handleSubmit(event){
    event.preventDefault();

    var member = new FormData();

    var { firstName, lastName, email, role, password, passwordConfirmation } = this.state;

    member.append("customer[first_name]", firstName);
    member.append("customer[last_name]", lastName);
    member.append("customer[email]", email);
    if (password) {
      member.append("customer[password]", password);
      member.append("customer[password_confirmation]", passwordConfirmation);
    }

    FetchWithPush(this, `/api/v1/customers/${this.props.match.params.id}.json`, '', 'PATCH', 'memberErrors', member)
      .then(body => {
        if (!body.errors) {
          if (body.member.isCurrentUser){
            var element = document.getElementById('ca-app');
            element.setAttribute('data-customer-id', body.member.id);
            element.setAttribute('data-customer-name', body.member.name);
            element.setAttribute('data-customer-gallery', body.member.gallery);
            element.setAttribute('data-gallery-id', body.member.galleryId);
            this.props.updateAppData(body.member.id, body.member.name, body.member.gallery, body.member.galleryId);

            this.props.history.push('/');
          } else {
            this.props.history.push('/settings/members');
          }
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));

  }

  render(){
    var { memberErrors } = this.state
    var firstNameError, lastNameError, emailError, passwordError, passwordConfirmationError

    firstNameError = CreateErrorElements(memberErrors.first_name, "First Name")
    lastNameError = CreateErrorElements(memberErrors.last_name, "Last Name")
    emailError = CreateErrorElements(memberErrors.email, "Email")
    passwordError = CreateErrorElements(memberErrors.password, "Password")
    passwordConfirmationError = CreateErrorElements(memberErrors.password_confirmation, "Password Confirmation")

    var firstNameClass = ErrorClassValidation(firstNameError)
    var lastNameClass = ErrorClassValidation(lastNameError)
    var emailClass = ErrorClassValidation(emailError)
    var passwordClass = ErrorClassValidation(passwordError)
    var passwordConfirmationClass = ErrorClassValidation(passwordConfirmationError)


    return(
      <div className="container cmmntz-container center-form">
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
            <div className="col-12">
              <button type="Submit" id="create-member-button" className="btn btn-sm black-button float-right" onClick={this.handleSubmit}>Save Changes</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default EditMemberContainer;
