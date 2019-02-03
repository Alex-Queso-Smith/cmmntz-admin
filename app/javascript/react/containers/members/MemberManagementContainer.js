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
  updateDisplay = this.updateDisplay.bind(this);

  handleTabClick(event){
    const target = event.target;
    const value = target.getAttribute('data-value');

    this.setState({
      display: value
    })
  }

  updateDisplay(page){
    this.setState({
      display: page
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
          updateDisplay={this.updateDisplay}
        />
        break;
      default:

    }

    return(
      <div className="container cmmntz-container center-form">
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
