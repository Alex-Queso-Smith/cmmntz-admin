import React from "react";

import MemberTile from '../components/MemberTile';

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
        {allMembers}
      </div>
    )
  }
}

export default MembersContainer;
