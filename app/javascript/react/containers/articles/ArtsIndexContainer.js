import React from 'react';
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
      debugger
    })
  }


  render(){
    var formattedArts =
    this.state.artsData.map((row) => {
      var art = row.art
      // debugger
      return(
        <div key={`art_${art.id}`} >
          <h3>{art.type}: <a href={art.url} target="_blank">{art.url}</a></h3>
          <p>Artist: {art.artist}</p>
          <p>Status: {art.status}</p>
          <p>Publication Date: {art.publishedAt}</p>
          <p>Thread Started On: {art.threadStarted}</p>
          <p>Last User Interaction: {art.lastInteraction}</p>
          <p>Topics: {art.topics}</p>
          <p>Pending Comments: {art.pendingComments}</p>
          <hr/>
        </div>
      )
    })

    return(
      <div>
        Arts
        {formattedArts}
      </div>
    )
  }
}


export default ArtsIndexContainer;
