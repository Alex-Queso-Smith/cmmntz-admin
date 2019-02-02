import React from 'react';

import { MemberTabs } from '../../components/Tabs';
import MembersContainer from './MembersContainer';
import NewMemberContainer from './NewMemberContainer';

class MemberManagementContainer extends React.Component {
  state = {
    display: ""
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
      default:

    }

    return(
      <div id="ca-member-management-container" className="cmmntz-container">
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
