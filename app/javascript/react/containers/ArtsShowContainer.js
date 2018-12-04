import React from 'react';
import { FetchDidMount } from '../util/CoreUtil';

import ManageComment from '../components/ManageComment';

class ArtsShowContainer extends React.Component {
  state = {
    comments: []
  }

  componentDidMount(){
    FetchDidMount(this, `/api/v1/arts/${this.props.match.params.id}.json`)
    .then(artData => {
      this.setState({ comments: artData.art.comments })
    })
  }

  render(){
    var { comments } = this.state;
    var allComments;
    if (comments) {
      allComments = comments.map(comment => {
        return(
          <ManageComment
            key={comment.id}
            text={comment.text}
            userName={comment.user_name}
            datePosted={comment.date_posted}
          />
        )
      })
    }

    return(
      <div className="cf-manage-comments container">
        {allComments}
      </div>
    )
  }
}


export default ArtsShowContainer;
