import React from 'react';
import { FetchDidMount, FetchWithUpdate, FetchIndividual } from '../../util/CoreUtil';

import ArtCommentsContainer from './ArtCommentsContainer'

class ArtsShowContainer extends React.Component {



  render(){
    var artId = this.props.match.params.id

    return(
      <div className="container cmmntz-container">

        <div className="container mt-4">
          <ArtCommentsContainer
            artId={artId}
          />
        </div>
      </div>
    )
  }
}


export default ArtsShowContainer;
