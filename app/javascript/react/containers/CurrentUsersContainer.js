import React from 'react';

import { FetchDidMount, FetchWithUpdate } from '../util/CoreUtil';
import UserTile from '../components/users/UserTile';

class CurrentUsersContainer extends React.Component {
  state = {
    users: [],
    search: "created_at",
    searchOrder: "desc"
  }

  handleChange = this.handleChange.bind(this);
  updateSearch = this.updateSearch.bind(this);
  handleSearch = this.handleSearch.bind(this);

  componentDidMount(){
    this.handleSearch()
  }

  handleChange(event){
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSearch(){
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

  updateSearch(event){
    this.handleChange(event);
    setTimeout(function() {
       this.handleSearch();
     }.bind(this), 20)
  }

  render(){
    var allUsers;

    if (this.state.users) {
      allUsers = this.state.users.map(user => {

        var userEmail;
        if (user.email) {
          userEmail =
          <a href={`mailto:${user.email}`}>{user.email}</a>
        }

        return(
          <tr key={user.id}>
            <UserTile user={user} />
            <td>{userEmail}</td>
            <td>{user.votes_count}</td>
            <td>
              C: {user.comments_count}
              <br/>
              R: {user.replies_count}
            </td>
            <td>
              F: {user.friends_count}
              <br/>
              B: {user.blocks_count}
            </td>
            <td>{user.anons_count}</td>
            <td>
              F: {user.feedbacks_count}
              <br/>
              B: {user.bugs_count}
            </td>
            <td>{user.custom_settings}</td>
            <td>{user.tutorial_opened}</td>
            <td>{user.article_views}</td>
            <td>{user.registered_at}</td>
            <td>{user.last_action_at}</td>
            <td>{user.login_count}</td>
            <td>{user.current_login_ip}</td>
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
              <th className="table-user-name">User Name</th>
              <th>Email</th>
              <th>Votes</th>
              <th>
                Comments
                <br/>
                Replies
              </th>
              <th>
                Friends
                <br/>
                Blocks
              </th>
              <th>Anons</th>
              <th>
                Feedbacks
                <br/>
                Bugs
              </th>
              <th>Custom Settings?</th>
              <th>Tutorial Opened</th>
              <th>Articles Viewed</th>
              <th>Reg @</th>
              <th>Last Action At</th>
              <th>Logins</th>
              <th>Current Login Ip</th>
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
