import React from 'react'
import RulesContainer from './moderation/RulesContainer'
import UsersContainer from './moderation/UsersContainer'
import EmailsContainer from './moderation/EmailsContainer'

import { ModerationSettingsTabs }  from '../../components/Tabs';

class ModerationSettingsContainer extends React.Component {
  state = {
    display: "rules"
  }

  handleTabClick = this.handleTabClick.bind(this);
  updateDisplay = this.updateDisplay.bind(this);

  updateDisplay(page){
    this.setState({ display: page })
  }

  handleTabClick(event){
    const target = event.target;
    const value = target.getAttribute('data-value');

    this.setState({
      display: value
     })
  }

  render() {
    var { display } = this.state
    var page;
    switch (display) {
      case "rules":
        page =
          <RulesContainer
          updateDisplay={this.updateDisplay}
          />
        break;
      case "users":
        page =
          <UsersContainer
          updateDisplay={this.updateDisplay}
          />
        break;
      case "emails":
        page =
          <EmailsContainer
          updateDisplay={this.updateDisplay}
          />
        break;
      default:
        page  =
          <RulesContainer
          updateDisplay={this.updateDisplay}
          />
    }
    return(
      <div className="cf-settings-base container">
        <ModerationSettingsTabs
          display={this.state.display}
          onClick={this.handleTabClick}
        />

        {page}
      </div>
    )
  }
}
export default ModerationSettingsContainer;
