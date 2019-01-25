import React from 'react';
import { FetchDidMount, FetchWithUpdate, FetchIndividual } from '../../util/CoreUtil';

import GalleryInfoContainer from './GalleryInfoContainer'
import GalleryCommentsContainer from './GalleryCommentsContainer'
import GallerySettingsContainer from './GallerySettingsContainer'

import { GalleryTabs }  from '../../components/Tabs';

class GallerysShowContainer extends React.Component {
  state = {
    display: ""
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
          <GalleryInfoContainer
            artId={artId}
            updateDisplay={this.updateDisplay}
          />
        break;
      case "settings":
        page =
          <GallerySettingsContainer
            artId={artId}
            updateDisplay={this.updateDisplay}
          />
        break;
      case "comments":
        page =
          <GalleryCommentsContainer
            artId={artId}
            updateDisplay={this.updateDisplay}
          />
        break;
      default:
        page  =
          <GalleryInfoContainer
            artId={artId}
          />
    }

    return(
      <div className="container">

        <GalleryTabs
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


export default GallerysShowContainer;
