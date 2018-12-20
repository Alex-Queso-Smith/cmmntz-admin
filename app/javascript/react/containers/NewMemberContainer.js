import React from 'react';

import { Input } from '../components/FormComponents';

class NewMemberContainer extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    role: ""
  }

  handleSubmit = this.handleSubmit.bind(this);
  handleChange = this.handleChange.bind(this);

  handleChange(event){
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({ [name]: value })
  }

  handleSubmit(){

  }

  render(){
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
          />
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
          <h4>Role:</h4>
          <select name="role" value={this.props.role} onChange={this.onChange}>
            <option  value='' />
            <option value="super_admin" className="filter-list-item">
              Super Admin
            </option>
            <option value="admin" className="filter-list-item">
              Admin
            </option>
            <option value="artist" className="filter-list-item">
              Artist
            </option>
            <option value="moderator" className="filter-list-item">
              Moderator
            </option>
          </select>
        </div>
        <button id="create-member-button" className="btn btn-sm btn-dark float-right">Create Member</button>
        </form>
      </div>
    )
  }
}

export default NewMemberContainer;
