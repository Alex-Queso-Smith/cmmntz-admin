import React from 'react';
import Textarea from 'react-expanding-textarea';
import { Link } from 'react-router-dom';

import { FetchWithPush, FetchDidMount } from '../util/CoreUtil';
import { Checkbox, Input } from '../components/FormComponents';
import CommentFiltersContainer from './CommentFiltersContainer';

class GallerySettingsContainer extends React.Component {
  state = {
    galleryId: "",
    name: "",
    sortOpts: {
      sortDir: 'desc',
      sortType: 'created_at',
      notFilterList: [],
      filterList: [],
      commentsFrom: "",
      votesFrom: ""
    },
    censor: false,
    commentApprovalNeeded: false,
    notifyOnNewComment: false,
    notifyOnCommentApprovalNeeded: false,
    threadExpirationDays: "",
    commentEtiquette: ""
  }

  handleFilterByClick = this.handleFilterByClick.bind(this);
  handleFilterClick = this.handleFilterClick.bind(this);
  handleSortDirClick = this.handleSortDirClick.bind(this);
  handleChange = this.handleChange.bind(this);
  handleSubmit = this.handleSubmit.bind(this);

  componentDidMount(){
    FetchDidMount(this, `/api/v1/galleries/${this.props.match.params.id}.json`)
    .then(galleryData => {

      var opts = this.state.sortOpts
      var { sort_dir, sort_type, comments_from, votes_from, filter_list, not_filter_list, censor, thread_expiration_days, comment_approval_needed, notify_on_comment_approval_needed, notify_on_new_comment } = galleryData.gallery.settings
      var { id, name, comment_etiquette } = galleryData.gallery;
      var censored = censor === "true" ? true : false;
      var commentApprovalNeeded = comment_approval_needed === "true" ? true : false;
      var notifyOnCommentApprovalNeeded = notify_on_comment_approval_needed === "true" ? true : false;
      var notifyOnNewComment = notify_on_new_comment === "true" ? true : false;

      opts.sortDir = sort_dir
      opts.sortType = sort_type
      opts.commentsFrom = comments_from
      opts.votesFrom = votes_from
      if (filter_list.length != 0 ) { opts.filterList = filter_list.split(',') }
      if (not_filter_list.length != 0) { opts.notFilterList = not_filter_list.split(',') }

      this.setState({
        sortOpts: opts,
        censor: censored,
        threadExpirationDays: thread_expiration_days,
        name: name,
        galleryId: id,
        commentEtiquette: comment_etiquette,
        commentApprovalNeeded: commentApprovalNeeded,
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

    const strip = (str) => {
      return str.replace(/^\s+|\s+$/g, '');
    }

    var { sortDir, sortType, notFilterList, filterList, commentsFrom, votesFrom } = this.state.sortOpts;
    var { censor, threadExpirationDays, commentEtiquette, commentApprovalNeeded, notifyOnCommentApprovalNeeded, notifyOnNewComment } = this.state;

    var gallery = new FormData();
    gallery.append("gallery[sort_dir]", sortDir);
    gallery.append("gallery[sort_type]", sortType);
    gallery.append("gallery[not_filter_list]", notFilterList);
    gallery.append("gallery[filter_list]", filterList);
    gallery.append("gallery[comments_from]", commentsFrom);
    gallery.append("gallery[votes_from]", votesFrom);
    gallery.append("gallery[censor]", censor);
    gallery.append("gallery[default_art_thread_expiration_days]", threadExpirationDays)
    gallery.append("gallery[comment_etiquette]", strip(commentEtiquette))
    gallery.append("gallery[comment_approval_needed]", commentApprovalNeeded)
    gallery.append("gallery[notify_on_comment_approval_needed]", notifyOnCommentApprovalNeeded)
    gallery.append("gallery[notify_on_new_comment]", notifyOnNewComment)

    FetchWithPush(this, `/api/v1/galleries/${this.props.match.params.id}.json`, '/', 'PATCH', 'saveErrors', gallery)
    .then(redirect => window.location = '/galleries')
    .then(redirect => { alert('Settings updated!') })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render(){
    var { sortOpts, censor, commentEtiquette, commentApprovalNeeded, notifyOnCommentApprovalNeeded, notifyOnNewComment, threadExpirationDays } = this.state;

    return(
      <div id="gallery-edit-settings-container">
        <Link id="banned-user-link" to="/gallery_blacklistings">View Current Banned Users</Link>
        <hr/>
        <h5 className="text-center">Choose default sort and filter settings</h5>
        <br />
        <CommentFiltersContainer
          sortOpts={sortOpts}
          handleFilterSubmit={this.handleChange}
          handleSortDirClick={this.handleSortDirClick}
          handleFilterClick={this.handleFilterClick}
          handleFilterByClick={this.handleFilterByClick}
        />
        <div className="row">
          <Checkbox
            onChange={this.handleChange}
            name={"censor"}
            label={"Censor all comments?"}
            checked={censor}
          />
        </div>
        <div className="text-center text-medium margin-top-10px">Commenting Etiquette</div>
        <Textarea
          maxLength="8000"
          className="form-control margin-top-10px textarea"
          name="commentEtiquette"
          placeholder="Insert your custom commenting etiquette here or leave blank to use Classibridge default etiquette!"
          value={commentEtiquette}
          onChange={this.handleChange}
          rows={10}
        />
        <hr />
        <div className="text-center text-medium margin-top-10px">Default Thread Settings</div>
        <Checkbox
          onChange={this.handleChange}
          name={"commentApprovalNeeded"}
          label={"Approve all comments before displaying?"}
          checked={commentApprovalNeeded}
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
          <button className="btn btn-med btn-primary" onClick={this.handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    )
  }
}


export default GallerySettingsContainer;
