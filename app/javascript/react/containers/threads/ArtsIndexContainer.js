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
        <div key={`art_${art.id}`} className="thread-listing" >
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
