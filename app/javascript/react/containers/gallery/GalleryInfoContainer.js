import React from 'react';
import { FetchDidMount } from '../../util/CoreUtil';

class GalleryInfoContainer extends React.Component {
  state = {
    galleryData: {
    }
  }

  componentDidMount(){
    FetchDidMount(this, `/api/v1/galleries/${this.props.galleryId}.json`)
    .then(galleryData => {
      this.setState({
        galleryData: galleryData.art
      })
    })
  }


  render(){

    return(
      <div>
        <h3>Gallery Data Here</h3>

      </div>
    )
  }
}


export default GalleryInfoContainer;
