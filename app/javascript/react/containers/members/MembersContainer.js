import React from "react";
import { Link } from 'react-router-dom';

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
        var editButton = <Link to={`/members/${member.id}`} >Edit</Link>

        return(
          <MemberTile
            key={id}
            name={name}
            role={role}
            email={email}
            editButton={editButton}
          />
        )
      })
    }

    return(
      <div id="cf-members-container">
        <br/>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Edit</th>
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
