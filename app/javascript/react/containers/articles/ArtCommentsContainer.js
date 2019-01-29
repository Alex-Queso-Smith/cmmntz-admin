import React from 'react';
import { FetchDidMount, FetchWithUpdate, FetchIndividual } from '../../util/CoreUtil';
import {Checkbox} from '../../components/FormComponents';

import ManageComment from '../../components/ManageComment';
import { CommentTabs }  from '../../components/Tabs';

class ArtCommentsContainer extends React.Component {
  state = {
    comments: [],
    manageIds: [],
    display: "pending",
    allSelected: false
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
  selectAllComments = this.selectAllComments.bind(this);

  componentDidMount(){
    this.loadComments("")
  }

  selectAllComments(event) {
    var { comments, manageIds } = this.state
    if (event.target.checked){
      var newManageIds = []
      comments.forEach(function(comment) {
        newManageIds.push(comment.id)
      })

      this.setState({
        manageIds: newManageIds,
        allSelected: true
      })
    } else {
      this.setState({
        allSelected: false
      })
    }
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

      var url = `/api/v1/arts/${this.props.artId}/mass_manage_comments.json`;
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
    var comments = this.state.comments

    if (checked) {
      newManageIds.push(commentId)
    } else {
      newManageIds = newManageIds.filter(v => v != commentId)
    }
    var newAllSelected = (comments.length == newManageIds.length)
    this.setState({
      manageIds: newManageIds,
      allSelected: newAllSelected
    })
  }

  handleTabClick(event){
    const target = event.target;
    const value = target.getAttribute('data-value');

    this.setState({
      display: value,
      manageIds: [],
      allSelected: false
     })
    this.loadComments(value)
  }

  loadComments(type){
    var url = `/api/v1/arts/${this.props.artId}/comments.json`;

    if (type != "") {
      url += `?display_mode=${type}`
    }

    FetchDidMount(this, url)
    .then(commentData => {
      this.setState({
        comments: commentData.comments,
        allSelected: false
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
    updateComment.append("comment[approved_by]", "mod")

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
    var { comments, display, manageIds } = this.state;
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

        var checked = manageIds.includes(comment.id)

        return(
          <div key={comment.id} className="border-1px-bot">
            <ManageComment
              id={comment.id}
              text={comment.text}
              userName={comment.user_name}
              userIsAdmin={comment.user_is_admin}
              userIsMod={comment.user_is_mod}
              datePosted={comment.date_posted}
              handleDeleteComment={handleCommentDelete}
              handleManageComment={handleManageComment}
              manage={display}
              handleBanUser={handleBanUser}
              handleCheck={handleCheckbox}
              checked={checked}
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

    var allSelected = this.state.allSelected
    var selectAllButton =
    <Checkbox
      name="allSelected"
      onChange={this.selectAllComments}
      label="Select All"
      checked={allSelected}
    />
  // debugger
    var manageButtons;
    if (this.state.manageIds != ""){
      if (display == "") {
        manageButtons =
        <div className="col-sm-10">
          {deleteButton}
        </div>
      } else if (display == "pending") {
        manageButtons =
        <div className="col-sm-10">
          {approveButton}
          {deleteButton}
        </div>
      } else if (display == "flagged") {
        manageButtons =
        <div className="col-sm-9 col-md-10">
          {ignoreButton}
          {deleteButton}
        </div>
      } else if (display == "deleted") {
        manageButtons =
        <div className="col-sm-10">
          {restoreButton}
        </div>
      }
    }

    return(
      <div className="cf-manage-comments container">
        <CommentTabs
          display={this.state.display}
          onClick={this.handleTabClick}
        />
        <div className="row margin-top-10px">
          <div className="col-sm-3 col-md-2">
            {selectAllButton}
          </div>
          {manageButtons}
        </div>

        {allComments}
      </div>
    )
  }
}


export default ArtCommentsContainer;
