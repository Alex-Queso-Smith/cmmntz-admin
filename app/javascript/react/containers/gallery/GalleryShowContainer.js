import React from 'react';
import { FetchDidMount, FetchWithUpdate, FetchIndividual } from '../../util/CoreUtil';

import GalleryInfoContainer from './GalleryInfoContainer'
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
    var galleryId = this.props.match.params.id
    var page;
    switch (display) {
      case "":
        page =
          <GalleryInfoContainer
            galleryId={galleryId}
            updateDisplay={this.updateDisplay}
          />
        break;
      case "settings":
        page =
          <GallerySettingsContainer
            galleryId={galleryId}
            updateDisplay={this.updateDisplay}
          />
        break;
      default:
        page  =
          <GalleryInfoContainer
            galleryId={galleryId}
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
