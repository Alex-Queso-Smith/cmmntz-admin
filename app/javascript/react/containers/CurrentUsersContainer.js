import React from 'react';
import { Link } from 'react-router-dom';

import { FetchDidMount, FetchWithUpdate, FetchIndividual } from '../util/CoreUtil';

import BanUser from '../components/modals/BanUser';

class CurrentUsersContainer extends React.Component {
  state = {
    users: [],
    search: "created_at",
    searchOrder: "desc"
  }

  handleChange = this.handleChange.bind(this);
  updateSearch = this.updateSearch.bind(this);
  handleSearch = this.handleSearch.bind(this);
  banUser = this.banUser.bind(this);

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

  banUser(userId, event){
    var c = confirm("Do you wish to ban this user?")

    if (c) {
      var l = event.target.previousSibling.value
      FetchIndividual(this, `/api/v1/gallery_blacklistings.json?user_id=${userId}&dur=${l}`, "POST")
      .then(success => {
        var allUsers = this.state.users;
        var filteredUsers = allUsers.filter(user => user.id != userId)
        this.setState({ users: filteredUsers })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
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

        var handleBanUser = (event) => {
          this.banUser(user.id, event)
        }

        return(
          <div key={user.id} className="user-container cmmntz-container">
            <div className="row">
              <div className="col-6">
                {user.user_name}
                <hr />
                Comments: {user.comments_count}<br />
                Votes: {user.votes_count}
              </div>
              <div className="col-6">
                Reg @: {user.registered_at}<br />
                Email: {userEmail}
                <hr />
                <BanUser banAction={handleBanUser} />
              </div>
            </div>
          </div>
        )
      })
    }

    return(
      <div className="current-users-container">
        <Link id="banned-user-link" to="/gallery_blacklistings">View Current Banned Users</Link>
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
        <hr />
        {allUsers}
      </div>
    )
  }
}

export default CurrentUsersContainer;
