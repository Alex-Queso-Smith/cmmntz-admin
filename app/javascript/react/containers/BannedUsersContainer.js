import React from 'react';

import { FetchDidMount } from '../util/CoreUtil';

class BannedUsersContainer extends React.Component {
  state = {
    bannedUsers: []
  }

  componentDidMount(){
    FetchDidMount(this, `/api/v1/gallery_blacklistings.json`)
    .then(bannedUsers => {
      this.setState({ bannedUsers: bannedUsers.blacklistings })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    var { bannedUsers } = this.state;

    var bannedUsersList;
    if (bannedUsers) {
      bannedUsersList = bannedUsers.map(bannedUsers => {
        return(
          <div className="cf-banned-user-tile">
          </div>
        )
      })

    }


    return(
      <div className="cf-banned-users-container">
      Howdy Banned users
      </div>
    )
  }
}


export default BannedUsersContainer;
