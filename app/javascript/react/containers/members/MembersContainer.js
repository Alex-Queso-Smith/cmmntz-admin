import React from "react";

import MemberTile from '../../components/members/MemberTile';
import { FetchDidMount } from '../../util/CoreUtil';

class MembersContainer extends React.Component {
  state = {
    members: []
  }

  componentDidMount(){
    this._isMounted = true;

    FetchDidMount(this, `/api/v1/customers.json`)
    .then(customerData => {
      if (this._isMounted) {
        this.setState({
          members: customerData.customers
        })
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  render(){
    var { members } = this.state;

    var allMembers;
    if (members) {
      allMembers = members.map(member => {
        var { id, name, role, email } = member;

        return(
          <MemberTile
            key={id}
            name={name}
            role={role}
            email={email}
          />
        )
      })
    }

    return(
      <div id="cf-members-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {allMembers}
          </tbody>
        </table>
      </div>
    )
  }
}

export default MembersContainer;
