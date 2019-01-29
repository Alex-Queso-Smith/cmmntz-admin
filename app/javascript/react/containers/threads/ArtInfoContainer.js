import React from 'react';
import { FetchDidMount } from '../../util/CoreUtil';

class ArtsInfoContainer extends React.Component {
  state = {
    artData: {
      id: '',
      type: '',
      url: '',
      artist: '',
      status: '',
      publishedAt: '',
      threadStarted: '',
      lastInteraction: '',
      topics: '',
      pendingComments: 0,
      flaggedComments: 0,
      approvedComments: 0,
      deletedComments: 0,
      interactions: 0
    }
  }

  componentDidMount(){
    FetchDidMount(this, `/api/v1/arts/${this.props.artId}.json`)
    .then(artData => {
      this.setState({
        artData: artData.art
      })
    })
  }


  render(){
    var {id, type, url, artist, status, publishedAt, threadStarted, lastInteraction, topics, pendingComments, flaggedComments, approvedComments, deletedComments, interactions } = this.state.artData

    return(
      <div>
        <h3>{type}: <a href={url} target="_blank">{url}</a></h3>
        <p>Artist: {artist}</p>
        <p>Status: {status}</p>
        <p>Publication Date: {publishedAt}</p>
        <p>Thread Started On: {threadStarted}</p>
        <p>Last User Interaction: {lastInteraction}</p>
        <p>Topics: {topics}</p>
        <p>Pending Comments: {pendingComments}</p>
        <p>Flagged Comments: {flaggedComments}</p>
        <p>Approved Comments: {approvedComments}</p>
        <p>Deleted Comments: {deletedComments}</p>
        <p>Users: {interactions}</p>

      </div>
    )
  }
}


export default ArtsInfoContainer;
