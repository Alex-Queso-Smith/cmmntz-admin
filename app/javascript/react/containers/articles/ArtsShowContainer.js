import React from 'react';
import { FetchDidMount, FetchWithUpdate, FetchIndividual } from '../../util/CoreUtil';

import ArtInfoContainer from './ArtInfoContainer'
import ArtCommentsContainer from './ArtCommentsContainer'
import ArtSettingsContainer from './ArtSettingsContainer'

import { ArtTabs }  from '../../components/Tabs';

class ArtsShowContainer extends React.Component {
  state = {
    display: "settings"
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


  render(){
    var { display } = this.state;
    var artId = this.props.match.params.id
    var page;
    switch (display) {
      case "":
        page =
          <ArtInfoContainer
            artId={artId}
            updateDisplay={this.updateDisplay}
          />
        break;
      case "settings":
        page =
          <ArtSettingsContainer
            artId={artId}
            updateDisplay={this.updateDisplay}
          />
        break;
      case "comments":
        page =
          <ArtCommentsContainer
            artId={artId}
            updateDisplay={this.updateDisplay}
          />
        break;
      default:
        page  =
          <ArtInfoContainer
            artId={artId}
          />
    }

    return(
      <div className="container">

        <ArtTabs
          display={this.state.display}
          onClick={this.handleTabClick}
        />
      <div className="container mt-4">
          {page}
        </div>
      </div>
    )
  }
}


export default ArtsShowContainer;
