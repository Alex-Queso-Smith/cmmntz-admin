import React from 'react';
import { FetchDidMount, FetchWithUpdate } from '../util/CoreUtil';

import ManageComment from '../components/ManageComment';

class ArtsShowContainer extends React.Component {
  state = {
    comments: [],
    galleryId: ""
  }

  deleteComment = this.deleteComment.bind(this);

  componentDidMount(){
    FetchDidMount(this, `/api/v1/arts/${this.props.match.params.id}.json`)
    .then(artData => {
      this.setState({
        comments: artData.art.comments,
        galleryId: artData.art.gallery_id
      })
    })
  }

  deleteComment(commentId){
    var { galleryId } = this.state;
    var c = confirm("Do you wish to delete this comment from thread?")

    if (c) {
      var updateComment = new FormData();
      updateComment.append("comment[deleted]", true)

      FetchWithUpdate(this, `/api/v1/comments/${commentId}.json?gallery_id=${galleryId}`, "DELETE", updateComment)
      .then(success => {
        var allComments = this.state.comments;
        var filteredComments = allComments.filter(comment => comment.id != commentId)
        this.setState({ comments: filteredComments })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  render(){
    var { comments } = this.state;
    var allComments;
    if (comments) {
      allComments = comments.map(comment => {
        var handleCommentDelete = () => {
          this.deleteComment(comment.id)
        }
        return(
          <ManageComment
            key={comment.id}
            text={comment.text}
            userName={comment.user_name}
            datePosted={comment.date_posted}
            onClick={handleCommentDelete}
          />
        )
      })
    } else {
      allComments = <h3>There are no comments for this thread</h3>
    }

    return(
      <div className="cf-manage-comments container">
        {allComments}
      </div>
    )
  }
}


export default ArtsShowContainer;
