import React from 'react';

import { FetchDidMount, FetchIndividual } from '../../util/CoreUtil';

class BannedUsersContainer extends React.Component {
  state = {
    bannedUsers: []
  }

  unbanUser = this.unbanUser.bind(this);

  componentDidMount(){
    FetchDidMount(this, `/api/v1/gallery_blacklistings.json`)
    .then(bannedUsers => {
      this.setState({ bannedUsers: bannedUsers.blacklistings })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  unbanUser(userId){
    var c = confirm("Do you wish to unban this user?")
    if (c) {
      FetchIndividual(this, `/api/v1/gallery_unblacklistings.json?user_id=${userId}`, "POST")
      .then(success => {
        var allUsers = this.state.bannedUsers;
        var filteredUsers = allUsers.filter(user => user.user_id != userId)
        this.setState({ bannedUsers: filteredUsers })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  render(){
    var { bannedUsers } = this.state;

    var bannedUsersList;
    if (bannedUsers) {
      bannedUsersList = bannedUsers.map(user => {
        var handleUnban = () => {
          this.unbanUser(user.user_id)
        }

        return(
          <tr key={user.user_id}>
            <td>{user.user_name}</td>
            <td>{user.created_at}</td>
            <td>{user.expires_at}</td>
            <td><button onClick={handleUnban} className="btn btn-link">Unban</button></td>
          </tr>
        )
      })
    }


    return(
      <div className="ca-banned-users-container container">
        <table className="table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Ban Date</th>
              <th>Ban Ends</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bannedUsersList}
          </tbody>
        </table>
      </div>
    )
  }
}


export default BannedUsersContainer;
