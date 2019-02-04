import React from 'react';
import { Link } from 'react-router-dom'
import { FetchDidMount } from '../../util/CoreUtil';

import ArtSettingsContainer from './ArtSettingsContainer'

class ArtContainer extends React.Component {
  state = {
    art: this.props.art,
    settingsOpen: false
  }

  updateArt = this.updateArt.bind(this);
  toggleSettings = this.toggleSettings.bind(this);
  scrollTop = this.scrollTop.bind(this);

  scrollTop() {
    var elem = document.getElementById(`thread-${this.state.id}`)
    elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  updateArt() {
    FetchDidMount(this, `/api/v1/arts/${this.state.art.id}.json`)
    .then(artData => {
      var art = artData.art
      this.setState({
        art: art
      })
    })
  }


  toggleSettings(){
    this.setState({settingsOpen: !this.state.settingsOpen})
  }


  render() {

    var art = this.state.art

    var settingsContainer;
    if (this.state.settingsOpen){
      settingsContainer =
      <ArtSettingsContainer
        artId={art.id}
        updateArt={this.updateArt}
        toggleSettings={this.toggleSettings}
        scrollTop={this.scrollTop}
      />
    }

    return(
      <div className="thread-listing cmmntz-container"  id={`thread-${this.state.id}`} >
        <div className="row">
          <div className="col-9">
            <h3><Link to={`/threads/${art.id}`}>{art.artType}: {art.url}</Link></h3>
          </div>
          <div className="col">
            <h4 className="float-right">Creator: {art.artist}</h4>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-2">
            <span className="art-status">Status:</span> <span className={`art-status-badge art-${art.status.toLowerCase()}`}>{art.status}</span>
          </div>
          <div className="col">
            Topics: <span className="pl-2">{art.topics}</span>
          </div>
        </div>

        <div className="row art-comments-counts mt-2">
          <div className="col-sm-2 art-comments-header">
            <Link to={`/threads/${art.id}`}>Comments</Link>
          </div>
          <div className="col-sm-2 art-comments art-comments-approved">
            Approved: {art.approvedComments}
          </div>
          <div className="col-sm-2 art-comments art-comments-pending">
            Pending: {art.pendingComments}
          </div>
          <div className="col-sm-2 art-comments art-comments-flagged">
            Flagged: {art.flaggedComments}
          </div>
          <div className="col-sm-2 art-comments art-comments-deleted">
            Deleted: {art.deletedComments}
          </div>
        </div>

        <div className="row art-interactions mt-2">
          <div className="col-3">
            Votes:
            <span className="pl-2">
            {art.votesCount}
            </span>
          </div>
        </div>

        <div className="row art-interactions mt-2">
          <div className="col-sm-4">
            Interactions:
            <span className="pl-2">
            {art.interactions}
            </span>
          </div>
          <div className="col-sm-4">
            Last Interaction:
            <span className="pl-2">
            {art.lastInteraction}
            </span>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col art-publish-date">
            Date: {art.publishedAt}
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="art-settings-link float-right" onClick={this.toggleSettings}>
              <img className="thread-settings-btn" src="https://classifilterstore.blob.core.windows.net/graphics/images/icons-v2/gear.png" />
            </div>
          </div>
        </div>
        {settingsContainer}
      </div>
    )
  }

}

export default ArtContainer
