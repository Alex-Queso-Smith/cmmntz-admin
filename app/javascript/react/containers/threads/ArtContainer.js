import React from 'react';
import { Link } from 'react-router-dom'

import ArtSettingsContainer from './ArtSettingsContainer'

class ArtContainer extends React.Component {
  state = {
    settingsOpen: false
  }

  render() {

    var art = this.props.art

    var settingsContainer;
    if (this.state.settingsOpen){
      settingsContainer =
      <ArtSettingsContainer
        artId={art.id}
      />
    }

    return(
      <div className="thread-listing" >
        <div className="row">
          <div className="col-sm-7">
            <h3><Link to={`/threads/${art.id}`}>{art.type}: {art.url}</Link></h3>
          </div>
          <div className="col">
            <h4>Creator: {art.artist}</h4>
          </div>
        </div>

        <div className="row">
          <div className="col-2">
            Status: {art.status}
          </div>
        </div>

        <div className="row">
          <div className="col-2">
            Comments:
          </div>
          <div className="col">
            <p>Approved: {art.approvedComments}</p>
          </div>
          <div className="col">
            <p>Pending: {art.pendingComments}</p>
          </div>
          <div className="col">
            <p>Flagged: {art.flaggedComments}</p>
          </div>
          <div className="col">
            <p>Deleted: {art.deletedComments}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-1">
            Votes:
          </div>
          <div className="col-1">
            #
          </div>
        </div>
        <div className="row">
          <div className="col">
            Date: {art.publishedAt}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="art-settings-link float-right" onClick={() => this.setState({settingsOpen: !this.state.settingsOpen})}>
              <img className="thread-settings-btn" src="https://classifilterstore.blob.core.windows.net/graphics/images/icons-v2/gear.png" height />
            </div>
          </div>
        </div>
        {settingsContainer}
      </div>
    )
  }

}

export default ArtContainer
