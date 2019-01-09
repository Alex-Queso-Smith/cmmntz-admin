import React from 'react';

import { FetchDidMount } from '../util/CoreUtil';

class CurrentUsersContainer extends React.Component {
  state = {
    users: [],
    search: ""
  }

  handleChange = this.handleChange.bind(this);

  componentDidMount(){
    FetchDidMount(this, `/api/v1/users.json`)
    .then(usersData => {
      this.setState({
        users: usersData.users
      })
    })
  }

  handleChange(event){
    this.setState({ [event.target.name]: event.target.value })
  }

  render(){
    var allUsers;

    if (this.state.users) {
      allUsers = this.state.users.map(user => {

        return(
          <tr key={user.id}>
            <td className="table-user-name">{user.user_name}</td>
            <td>{user.email}</td>
            <td>{user.registered_at}</td>
            <td>{user.geo_coordinates}</td>
            <td>{user.age_range}</td>
            <td>{user.gender}</td>
            <td>{user.login_count}</td>
            <td>{user.failed_login_count}</td>
            <td>{user.last_action_at}</td>
            <td>{user.current_login_at}</td>
            <td>{user.current_login_ip}</td>
            <td>{user.last_login_at}</td>
            <td>{user.last_login_ip}</td>
          </tr>
        )
      })
    }

    return(
      <div className="current-users-container">

        <div className="row search-options">
          <div className="col-6">
            
          </div>
          <div className="col-6">
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email</th>
              <th>Registered On</th>
              <th>Geo Coordinates</th>
              <th>Age Range</th>
              <th>Gender</th>
              <th>Login Count</th>
              <th>Failed Login Count</th>
              <th>Last Action At</th>
              <th>Current Login At</th>
              <th>Current Login Ip</th>
              <th>Last Login At</th>
              <th>Last Login Ip</th>
            </tr>
          </thead>
          <tbody>
            {allUsers}
          </tbody>
        </table>
      </div>
    )
  }
}

export default CurrentUsersContainer;
