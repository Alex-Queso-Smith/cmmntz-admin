import React from 'react';
import Textarea from 'react-expanding-textarea';
import { Link } from 'react-router-dom';

import { FetchWithPush, FetchDidMount } from '../../util/CoreUtil';
import { Checkbox, Input } from '../../components/FormComponents';

class ThreadsSettingsContainer extends React.Component {
  state = {
    galleryId: "",
    commentApprovalNeeded: false,
    guestApprovalNeeded: false,
    notifyOnNewComment: false,
    notifyOnCommentApprovalNeeded: false,
    threadExpirationDays: ""
  }

  handleFilterByClick = this.handleFilterByClick.bind(this);
  handleFilterClick = this.handleFilterClick.bind(this);
  handleSortDirClick = this.handleSortDirClick.bind(this);
  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);
  handleSortOptCheckChange = this.handleSortOptCheckChange.bind(this);

  componentDidMount(){
    FetchDidMount(this, `/api/v1/galleries/${document.getElementById('ca-app').getAttribute('data-gallery-id')}.json`)
    .then(galleryData => {

      var {  thread_expiration_days, comment_approval_needed, notify_on_comment_approval_needed, guest_approval_needed, notify_on_new_comment, hide_anon_and_guest } = galleryData.gallery.settings
      var { id } = galleryData.gallery;
      var censored = censor === "true" || censor === true ? true : false;
      var commentApprovalNeeded = comment_approval_needed === "true" || comment_approval_needed === true ? true : false;
      var guestApprovalNeeded = guest_approval_needed === "true" || guest_approval_needed === true ? true : false;
      var notifyOnCommentApprovalNeeded = notify_on_comment_approval_needed === "true" || notify_on_comment_approval_needed === true ? true : false;
      var notifyOnNewComment = notify_on_new_comment === "true" || notify_on_new_comment === true ? true : false;

      this.setState({
        threadExpirationDays: thread_expiration_days,
        galleryId: id,
        commentApprovalNeeded: commentApprovalNeeded,
        guestApprovalNeeded: guestApprovalNeeded,
        notifyOnNewComment: notifyOnNewComment,
        notifyOnCommentApprovalNeeded: notifyOnCommentApprovalNeeded
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleSortOptCheckChange(event) {
    var target = event.target
    var newOpts = this.state.sortOpts
    newOpts[target.name] = target.checked

    this.setState({
      sortOpts: newOpts
    })
  }

  handleChange(event){
    const target = event.target;
    const name = target.name;

    var value;
    if (target.type === "checkbox") {
      value = target.checked
      this.setState({ [name]: value })
    } else {
      if (target.getAttribute('data-value')) {
        value = target.getAttribute('data-value')
      } else {
        value = target.value
        this.setState({ [name]: value })
      };

      var opts = this.state.sortOpts
      opts[name] = value

      this.setState({ sortOpts: opts })
    }
  };

  handleFilterByClick(event){
    const target = event.target;
    const name = target.name;
    const value = target.value;

    var opts = this.state.sortOpts
    opts[name] = value;

    this.setState({ sortOpts: opts })
  }

  handleFilterClick(event){
    event.preventDefault();
    const target = event.target;
    const name = target.getAttribute('data-value');
    var opts = this.state.sortOpts

    const right = [
      "dislike_percent",
      "dislike_a_lot_percent",
      "trash_percent",
      "warn_percent",
      "sad_percent",
      "boring_percent",
      "angry_percent"
    ]

    if (right.includes(name)) {
      if (opts.notFilterList.includes(name)) {
        var newFilters = opts.notFilterList.filter(v => v != name)
        opts.notFilterList = newFilters
        opts.filterList.push(name)
      } else if (opts.filterList.includes(name)) {
        var newFilters = opts.filterList.filter(v => v != name)
        opts.filterList = newFilters
      } else {
        opts.notFilterList.push(name)
      }
    } else {
      if (opts.filterList.includes(name)){
        var newFilters = opts.filterList.filter(v => v != name)
        opts.filterList = newFilters
        opts.notFilterList.push(name)
      } else if (opts.notFilterList.includes(name)) {
        var newFilters = opts.notFilterList.filter(v => v != name)
        opts.notFilterList = newFilters
      } else {
        opts.filterList.push(name)
      }
    }

    this.setState({ sortOpts: opts })
  }

  handleSortDirClick(event){
    event.preventDefault();
    var value = (this.state.sortOpts.sortDir == "asc") ? "desc" : "asc"

    var opts = this.state.sortOpts
    opts.sortDir = value

    this.setState({ sortOpts: opts })
  }

  handleSubmit(event){
    event.preventDefault();

    var { sortDir, sortType, notFilterList, filterList, commentsFrom, votesFrom, hideAnonAndGuest } = this.state.sortOpts;
    var { censor, threadExpirationDays, commentEtiquette, commentApprovalNeeded, guestApprovalNeeded, notifyOnCommentApprovalNeeded, notifyOnNewComment } = this.state;

    var gallery = new FormData();
    gallery.append("gallery[default_art_thread_expiration_days]", threadExpirationDays)
    gallery.append("gallery[comment_approval_needed]", commentApprovalNeeded)
    gallery.append("gallery[guest_approval_needed]", guestApprovalNeeded)
    gallery.append("gallery[notify_on_comment_approval_needed]", notifyOnCommentApprovalNeeded)
    gallery.append("gallery[notify_on_new_comment]", notifyOnNewComment)
    gallery.append("gallery[hide_anon_and_guest]", hideAnonAndGuest)

    FetchWithPush(this, `/api/v1/galleries/${document.getElementById('ca-app').getAttribute('data-gallery-id')}.json`, '/', 'PATCH', 'saveErrors', gallery)
    .then(redirect => window.location = '/galleries')
    .then(redirect => { alert('Settings updated!') })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    var { sortOpts, censor, commentEtiquette, commentApprovalNeeded, guestApprovalNeeded, notifyOnCommentApprovalNeeded, notifyOnNewComment, threadExpirationDays } = this.state;

    return(
      <div id="gallery-edit-settings-container">
        Thread Settings Here
        <Link id="banned-user-link" to="/gallery_blacklistings">View Current Banned Users</Link>
        <hr/>
        <div className="text-center text-medium margin-top-10px">Default Thread Settings</div>
        <Checkbox
          onChange={this.handleChange}
          name={"commentApprovalNeeded"}
          label={"Approve all comments before displaying?"}
          checked={commentApprovalNeeded}
        />
        <Checkbox
          onChange={this.handleChange}
          name={"guestApprovalNeeded"}
          label={"Approve Guest comments before displaying?"}
          checked={guestApprovalNeeded}
        />
        <Checkbox
          onChange={this.handleChange}
          name={"notifyOnCommentApprovalNeeded"}
          label={"Receive notification on comments needing approval?"}
          checked={notifyOnCommentApprovalNeeded}
        />
        <Checkbox
          onChange={this.handleChange}
          name={"notifyOnNewComment"}
          label={"Notify when new comment posted?"}
          checked={notifyOnNewComment}
        />

        <Input
          name="threadExpirationDays"
          label="Expire threads after how many days?"
          onChange={this.handleChange}
          content={threadExpirationDays}
          type="input"
          addClass={"input-small"}
        />
        <div className="margin-top-10px text-center">
          <button className="btn btn-med btn-dark" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    )
  }
}


export default ThreadsSettingsContainer;
