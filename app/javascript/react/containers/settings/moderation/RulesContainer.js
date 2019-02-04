import React from 'react';
import { Link } from 'react-router-dom';

import { FetchWithPush, FetchDidMount } from '../../../util/CoreUtil';
import { Checkbox, Input } from '../../../components/FormComponents';

class RulesContainer extends React.Component {
  state = {
    galleryId: "",
    censor: false,
    commentApprovalNeeded: false,
    guestApprovalNeeded: false,
    notifyOnNewComment: false,
    notifyOnCommentApprovalNeeded: false
  }

  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  componentDidMount(){
    FetchDidMount(this, `/api/v1/galleries/${document.getElementById('ca-app').getAttribute('data-gallery-id')}.json`)
    .then(galleryData => {

      var { censor, comment_approval_needed, notify_on_comment_approval_needed, guest_approval_needed, notify_on_new_comment } = galleryData.gallery.settings
      var { id } = galleryData.gallery;
      var censored = censor === "true" || censor === true ? true : false;
      var commentApprovalNeeded = comment_approval_needed === "true" || comment_approval_needed === true ? true : false;
      var guestApprovalNeeded = guest_approval_needed === "true" || guest_approval_needed === true ? true : false;
      var notifyOnCommentApprovalNeeded = notify_on_comment_approval_needed === "true" || notify_on_comment_approval_needed === true ? true : false;
      var notifyOnNewComment = notify_on_new_comment === "true" || notify_on_new_comment === true ? true : false;

      this.setState({
        censor: censored,
        galleryId: id,
        commentApprovalNeeded: commentApprovalNeeded,
        guestApprovalNeeded: guestApprovalNeeded,
        notifyOnNewComment: notifyOnNewComment,
        notifyOnCommentApprovalNeeded: notifyOnCommentApprovalNeeded
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleChange(event){
    const target = event.target;
    const name = target.name;

    var value;
    if (target.type === "checkbox") {
      value = target.checked
    } else {
      if (target.getAttribute('data-value')) {
        value = target.getAttribute('data-value')
      } else {
        value = target.value
      }
    }
    this.setState({ [name]: value })
  };

  handleSubmit(event){
    event.preventDefault();

    var { censor, commentApprovalNeeded, guestApprovalNeeded, notifyOnCommentApprovalNeeded, notifyOnNewComment } = this.state;

    var gallery = new FormData();
    gallery.append("gallery[censor]", censor);
    gallery.append("gallery[comment_approval_needed]", commentApprovalNeeded)
    gallery.append("gallery[guest_approval_needed]", guestApprovalNeeded)
    gallery.append("gallery[notify_on_comment_approval_needed]", notifyOnCommentApprovalNeeded)
    gallery.append("gallery[notify_on_new_comment]", notifyOnNewComment)

    FetchWithPush(this, `/api/v1/galleries/${document.getElementById('ca-app').getAttribute('data-gallery-id')}.json`, '', 'PATCH', 'saveErrors', gallery)
    // .then(redirect => window.location = '/galleries')
    .then(redirect => { alert('Settings updated!') })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    var { sortOpts, censor, commentEtiquette, commentApprovalNeeded, guestApprovalNeeded, notifyOnCommentApprovalNeeded, notifyOnNewComment, threadExpirationDays } = this.state;

    return(
      <div>
        <div className="text-center text-medium margin-top-10px">Moderation Settings</div>
        <hr/>
        <Checkbox
          onChange={this.handleChange}
          name={"censor"}
          label={"Censor all comments?"}
          checked={censor}
        />
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
        <div className="margin-top-10px text-center">
          <button className="btn btn-med btn-dark" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    )
  }
}


export default RulesContainer;
