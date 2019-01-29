import React from 'react';
import Textarea from 'react-expanding-textarea';
import { Link } from 'react-router-dom';

import { FetchWithPush, FetchDidMount } from '../../util/CoreUtil';
import { Checkbox, Input } from '../../components/FormComponents';
import CommentFiltersContainer from '../comments/CommentFiltersContainer';

class ThreadsSettingsContainer extends React.Component {
  state = {
    galleryId: "",
    name: "",
    sortOpts: {
      sortDir: 'desc',
      sortType: 'created_at',
      notFilterList: [],
      filterList: [],
      commentsFrom: "",
      votesFrom: "",
      hideAnonAndGuest: false
    },
    censor: false,
    threadExpirationDays: "",
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

      var opts = this.state.sortOpts
      var { sort_dir, sort_type, comments_from, votes_from, filter_list, not_filter_list, censor, thread_expiration_days, hide_anon_and_guest } = galleryData.gallery.settings
      var { id } = galleryData.gallery;
      var censored = censor === "true" || censor === true ? true : false;

      opts.sortDir = sort_dir
      opts.sortType = sort_type
      opts.commentsFrom = comments_from
      opts.votesFrom = votes_from
      opts.hideAnonAndGuest = hide_anon_and_guest
      if (filter_list.length != 0 ) { opts.filterList = filter_list.split(',') }
      if (not_filter_list.length != 0) { opts.notFilterList = not_filter_list.split(',') }

      this.setState({
        sortOpts: opts,
        censor: censored,
        threadExpirationDays: thread_expiration_days,
        galleryId: id
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

    const strip = (str) => {
      return str.replace(/^\s+|\s+$/g, '');
    }

    var { sortDir, sortType, notFilterList, filterList, commentsFrom, votesFrom, hideAnonAndGuest } = this.state.sortOpts;
    var { censor, threadExpirationDays } = this.state;

    var gallery = new FormData();
    gallery.append("gallery[sort_dir]", sortDir);
    gallery.append("gallery[sort_type]", sortType);
    gallery.append("gallery[not_filter_list]", notFilterList);
    gallery.append("gallery[filter_list]", filterList);
    gallery.append("gallery[comments_from]", commentsFrom);
    gallery.append("gallery[votes_from]", votesFrom);
    gallery.append("gallery[censor]", censor);
    gallery.append("gallery[default_art_thread_expiration_days]", threadExpirationDays)
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
        <h5 className="text-center">Choose default sort and filter settings</h5>
        <br />
        <CommentFiltersContainer
          sortOpts={sortOpts}
          handleFilterSubmit={this.handleChange}
          handleSortDirClick={this.handleSortDirClick}
          handleFilterClick={this.handleFilterClick}
          handleFilterByClick={this.handleFilterByClick}
          onChange={this.handleSortOptCheckChange}
        />
        <div className="row">
          <Checkbox
            onChange={this.handleChange}
            name={"censor"}
            label={"Censor all comments?"}
            checked={censor}
          />
        </div>
        <hr />

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
