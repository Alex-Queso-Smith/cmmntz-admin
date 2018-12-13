import React from 'react';
import { FetchDidMount, FetchWithUpdate, FetchIndividual } from '../util/CoreUtil';

import ManageComment from '../components/ManageComment';
import Tabs from '../components/Tabs';

class ArtsShowContainer extends React.Component {
  state = {
    comments: [],
    display: ""
  }

  deleteComment = this.deleteComment.bind(this);
  loadComments = this.loadComments.bind(this);
  handleTabClick = this.handleTabClick.bind(this);
  restoreComment = this.restoreComment.bind(this);
  approveComment = this.approveComment.bind(this);
  banUser = this.banUser.bind(this);

  componentDidMount(){
    this.loadComments("")
  }

  handleTabClick(event){
    const target = event.target;
    const value = target.getAttribute('data-value');

    this.setState({ display: value })
    this.loadComments(value)
  }

  loadComments(type){
    var url = `/api/v1/arts/${this.props.match.params.id}.json`;

    if (type != "") {
      url += `?display_mode=${type}`
    }

    FetchDidMount(this, url)
    .then(artData => {
      this.setState({
        comments: artData.art.comments
      })
    })
  }

  deleteComment(commentId){
    var c = confirm("Do you wish to delete this comment from thread?")

    if (c) {
      var updateComment = new FormData();
      updateComment.append("comment[deleted]", true)

      FetchWithUpdate(this, `/api/v1/comments/${commentId}.json`, "PATCH", updateComment)
      .then(success => {
        var allComments = this.state.comments;
        var filteredComments = allComments.filter(comment => comment.id != commentId)
        this.setState({ comments: filteredComments })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  approveComment(commentId){
    var updateComment = new FormData();
    updateComment.append("comment[approved]", true)

    FetchWithUpdate(this, `/api/v1/comments/${commentId}.json`, "PATCH", updateComment)
    .then(success => {
      var allComments = this.state.comments;
      var filteredComments = allComments.filter(comment => comment.id != commentId)
      this.setState({ comments: filteredComments })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  restoreComment(commentId){
    var updateComment = new FormData();
    updateComment.append("comment[deleted]", false)

    FetchWithUpdate(this, `/api/v1/comments/${commentId}.json`, "PATCH", updateComment)
    .then(success => {
      var allComments = this.state.comments;
      var filteredComments = allComments.filter(comment => comment.id != commentId)
      this.setState({ comments: filteredComments })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  banUser(userId, event){
    var c = confirm("Do you wish to ban this user?")

    if (c) {
      var l = event.target.previousSibling.value
      FetchIndividual(this, `/api/v1/gallery_blacklistings.json?user_id=${userId}&dur=${l}`, "POST")
      .then(success => {
        var allComments = this.state.comments;
        var filteredComments = allComments.filter(comment => comment.user_id != userId)
        this.setState({ comments: filteredComments })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  render(){
    var { comments, display } = this.state;
    var allComments;
    if (comments) {
      allComments = comments.map(comment => {

        var handleManageComment = () => {
          if (display === "pending") {
            this.approveComment(comment.id)
          } else if (display === "deleted") {
            this.restoreComment(comment.id)
          }
        }

        var handleCommentDelete = () => {
          this.deleteComment(comment.id)
        }

        var handleBanUser = (event) => {
          this.banUser(comment.user_id, event)
        }

        return(
          <div key={comment.id} className="border-1px-bot">
            <ManageComment
              text={comment.text}
              userName={comment.user_name}
              datePosted={comment.date_posted}
              handleDeleteComment={handleCommentDelete}
              handleManageComment={handleManageComment}
              manage={display}
              handleBanUser={handleBanUser}
              />
          </div>
        )
      })
    } else {
      allComments = <h3>There are no comments for this thread</h3>
    }

    return(
      <div className="cf-manage-comments container">
        <Tabs
          display={this.state.display}
          onClick={this.handleTabClick}
        />
        {allComments}
      </div>
    )
  }
}


export default ArtsShowContainer;
