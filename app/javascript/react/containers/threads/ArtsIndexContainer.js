import React from 'react';
import { Link } from 'react-router-dom'

import ArtContainer from './ArtContainer'

import { FetchDidMount } from '../../util/CoreUtil';

class ArtsIndexContainer extends React.Component {
  state = {
    artsData: []
  }

  componentDidMount(){
    FetchDidMount(this, `/api/v1/arts.json?index=1`)
    .then(artsData => {
      this.setState({
        artsData: artsData.arts
      })
    })
  }


  render(){
    var formattedArts =
    this.state.artsData.map((row) => {
      var art = row.art
      return(
        <ArtContainer
          key={`art_${art.id}`}
          art={art}
        />
      )
    })

    return(
      <div>
        <h3>Arts</h3>
        <h5>[Filtering] [+/-]</h5>
        <hr />
        <div>
          [Page 1][Page 2][...][Page x]
        </div>
        {formattedArts}
      </div>
    )
  }
}


export default ArtsIndexContainer;
