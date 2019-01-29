import React from 'react'
import { Link } from 'react-router-dom';

class UsersContainer extends React.Component {
  render(){
    return(
      <div id="gallery-edit-settings-container">
        <Link id="banned-user-link" to="/gallery_blacklistings">View Current Banned Users</Link>
        <br/>
        Users Settings?

      </div>
    )
  }
}

export default UsersContainer;
