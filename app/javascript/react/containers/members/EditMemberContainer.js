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

    FetchWithPush(this, `/api/v1/customers/${this.props.match.params.id}.json`, '/', 'PATCH', 'memberErrors', member)
      .then(body => {
        alert(`${body.message}`)
        // this.handleClear()
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));

  }

  render(){
    var { memberErrors }

    return(
      <div id="cf-new-member-container" className="jumbotron center-form">
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
          {firstNameErrors}
          <Input
            name="lastName"
            label="Last Name"
            addClass={''}
            type='text'
            content={this.state.lastName}
            onChange={this.handleChange}
          />
          <Input
            name="email"
            label="Email"
            addClass={''}
            type='text'
            content={this.state.email}
            onChange={this.handleChange}
          />
          <Input
            name="password"
            label="Password"
            addClass={''}
            type='password'
            content={this.state.password}
            onChange={this.handleChange}
          />
          <Input
            name="passwordConfirmation"
            label="Password Confirmation"
            addClass={''}
            type='password'
            content={this.state.passwordConfirmation}
            onChange={this.handleChange}
          />
          <div className="row">
            <div className="col-12">
              <button type="Submit" id="create-member-button" className="btn btn-sm btn-dark float-right" onClick={this.handleSubmit}>Save Changes</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default EditMemberContainer;
