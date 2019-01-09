import React from 'react';

import { FetchDidMount, FetchWithUpdate } from '../util/CoreUtil';

class CurrentUsersContainer extends React.Component {
  state = {
    users: [],
    search: "",
    searchOrder: "asc"
  }

  handleChange = this.handleChange.bind(this);
  updateSearch = this.updateSearch.bind(this);

  componentDidMount(){

    var search = new FormData();
    search.append("search[sort]", 'created_at')
    search.append("search[sort_dir]", 'desc')

    FetchWithUpdate(this, `/api/v1/user_searches.json`, 'POST', search)
    .then(userData => {
      this.setState({
        users: userData.users
      })
    })
  }

  handleChange(event){
    this.setState({ [event.target.name]: event.target.value })
  }

  updateSearch(event){
    this.handleChange(event);

    var search = new FormData();

    search.append("search[sort]", this.state.search)
    search.append("search[sort_dir]", this.state.searchOrder)

    FetchWithUpdate(this, `/api/v1/user_searches.json`, 'POST', search)
    .then(userData => {
      this.setState({
        users: userData.users
      })
    })
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
            <div className="float-right">
              <select name="search" value={this.state.search} onChange={this.updateSearch}>
                <option value=""></option>
                <option value="user_name">User Name</option>
                <option value="created_at">Registered At</option>
                <option value="login_count">Login Count</option>
                <option value="last_request_at">Last Action</option>
                <option value="current_login_at">Current Login At</option>
              </select>
            </div>
          </div>
          <div className="col-6">
            <div className="float-left">
              <select name="searchOrder" value={this.state.searchOrder} onChange={this.updateSearch}>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
            </div>
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
