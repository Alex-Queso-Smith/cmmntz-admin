import React from 'react';

import { MemberTabs } from '../../components/Tabs';
import MembersContainer from './MembersContainer';
import NewMemberContainer from './NewMemberContainer';
import ModeratorsContainer from './ModeratorsContainer';

class MemberManagementContainer extends React.Component {
  state = {
    display: "mods"
  }

  _isMounted = false
  handleTabClick = this.handleTabClick.bind(this);

  handleTabClick(event){
    const target = event.target;
    const value = target.getAttribute('data-value');

    this.setState({
      display: value
    })
  }

  render(){
    var { display, customers } = this.state;

    var page;
    switch (display) {
      case "":
        page =
        <MembersContainer
          members={customers}
        />
        break;
      case "new":
        page =
        <NewMemberContainer

        />
        break;
      case "mods":
        page =
        <ModeratorsContainer

        />
        break;
      default:

    }

    return(
      <div id="cf-member-management-container">
        <MemberTabs
          display={this.state.display}
          onClick={this.handleTabClick}
        />
        {page}
      </div>
    )
  }
}

export default MemberManagementContainer;
