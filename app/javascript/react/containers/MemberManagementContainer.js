import React from 'react';

import { FetchDidMount } from '../util/CoreUtil';
import { MemberTabs } from '../components/Tabs';
import MembersContainer from './MembersContainer';
import NewMemberContainer from './NewMemberContainer';

class MemberManagementContainer extends React.Component {
  state = {
    customers: [],
    display: ""
  }

  _isMounted = false
  handleTabClick = this.handleTabClick.bind(this);

  componentDidMount(){
    this._isMounted = true;

    FetchDidMount(this, `/api/v1/customers.json`)
    .then(customerData => {
      if (this._isMounted) {
        this.setState({
          customers: customerData.customers
        })
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

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
