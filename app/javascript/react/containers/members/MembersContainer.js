import React from "react";

import MemberTile from '../../components/members/MemberTile';

class MembersContainer extends React.Component {
  state = {
    members: this.props.members
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.members != prevProps.members) {
      this.setState({
        members: this.props.members
      })
    }
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
