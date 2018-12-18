import React from 'react';
import { FetchDidMount, FetchWithUpdate, FetchIndividual } from '../util/CoreUtil';

import ManageComment from '../components/ManageComment';
import Tabs from '../components/Tabs';

class ArtsShowContainer extends React.Component {
  state = {
    comments: [],
    manageIds: [],
    display: ""
  }

  deleteComment = this.deleteComment.bind(this);
  loadComments = this.loadComments.bind(this);
  handleTabClick = this.handleTabClick.bind(this);
  restoreComment = this.restoreComment.bind(this);
  approveComment = this.approveComment.bind(this);
  ignoreFlagComment = this.ignoreFlagComment.bind(this);
  banUser = this.banUser.bind(this);
  handleCheck = this.handleCheck.bind(this);
  handleManageSelected = this.handleManageSelected.bind(this);

  componentDidMount(){
    this.loadComments("")
  }

  handleManageSelected(action, event) {
    event.preventDefault();
    var commentIds = this.state.manageIds
    if (commentIds == "") {
      alert("Please select Comments to " + action + ".")
    } else {
      var formData = new FormData()
      formData.append("mass_manage_comment[action]", action)
      formData.append("mass_manage_comment[comment_ids]", commentIds)

      var url = `/api/v1/arts/${this.props.match.params.id}/mass_manage_comments.json`;
      FetchWithUpdate(this, url, "POST", formData)
      .then(success => {
        setTimeout(this.loadComments(this.state.display), 10);
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

  }

  handleCheck(commentId, event){
    var target = event.target;
    var checked = target.checked;
    var newManageIds = this.state.manageIds

    if (checked) {
      newManageIds.push(commentId)
    } else {
      newManageIds = newManageIds.filter(v => v != commentId)
    }
    this.setState({ manageIds: newManageIds })
  }

  handleTabClick(event){
    const target = event.target;
    const value = target.getAttribute('data-value');

    this.setState({
      display: value,
      manageIds: []
     })
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

  ignoreFlagComment(commentId){
    var updateComment = new FormData();
    updateComment.append("comment[ignore_flagged]", true)

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
          } else if (display === "flagged") {
            this.ignoreFlagComment(comment.id)
          }
        }

        var handleCommentDelete = () => {
          this.deleteComment(comment.id)
        }

        var handleBanUser = (event) => {
          this.banUser(comment.user_id, event)
        }

        var handleCheckbox = (event) => {
          this.handleCheck(comment.id, event)
        }

        return(
          <div key={comment.id} className="border-1px-bot">
            <ManageComment
              id={comment.id}
              text={comment.text}
              userName={comment.user_name}
              datePosted={comment.date_posted}
              handleDeleteComment={handleCommentDelete}
              handleManageComment={handleManageComment}
              manage={display}
              handleBanUser={handleBanUser}
              handleCheck={handleCheckbox}
              />
          </div>
        )
      })
    } else {
      allComments = <h3>There are no comments for this thread</h3>
    }

    var deleteAction = (event) => {
      this.handleManageSelected("delete", event)
    }
    var deleteButton =
    <button className="btn btn-danger cf-manage-button" onClick={deleteAction}>
      Delete Selected
    </button>

    var approveAction = (event) => {
      this.handleManageSelected("approve", event)
    }
    var approveButton =
    <button className="btn btn-dark cf-manage-button" onClick={approveAction}>
      Approve Selected
    </button>

    var ignoreAction = (event) => {
      this.handleManageSelected("ignore", event)
    }
    var ignoreButton =
    <button className="btn btn-dark cf-manage-button" onClick={ignoreAction}>
      Ignore Selected
    </button>

    var restoreAction = (event) => {
      this.handleManageSelected("restore", event)
    }
    var restoreButton =
    <button className="btn btn-dark cf-manage-button" onClick={restoreAction}>
      Restore Selected
    </button>

    var manageButtons;
    if (display == "") {
      manageButtons =
      <div className="margin-top-10px">
        {deleteButton}
      </div>
    } else if (display == "pending") {
      manageButtons =
      <div className="margin-top-10px">
        {approveButton}
        {deleteButton}
      </div>
    } else if (display == "flagged") {
      manageButtons =
      <div className="margin-top-10px">
        {ignoreButton}
        {deleteButton}
      </div>
    } else if (display == "deleted") {
      manageButtons =
      <div className="margin-top-10px">
        {restoreButton}
      </div>
    }

    return(
      <div className="cf-manage-comments container">
        <Tabs
          display={this.state.display}
          onClick={this.handleTabClick}
        />
        {manageButtons}

        {allComments}
      </div>
    )
  }
}


export default ArtsShowContainer;
