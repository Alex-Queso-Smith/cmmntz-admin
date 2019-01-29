import React from 'react';
import { Link } from 'react-router-dom'
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
        <div key={`art_${art.id}`} >
          <h4>{art.type}: <Link to={`/arts/${art.id}`} >{art.url}</Link></h4>
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
